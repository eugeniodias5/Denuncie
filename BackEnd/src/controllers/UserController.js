const sequelize = require('sequelize');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../database/models/User');

function generateToken(user) {
    const token = jwt.sign({
        idUser: user.idUser,
        email: user.email,
        name: user.name,
     }, process.env.JWT_SECRET
     , {
         expiresIn: '2h',
     })

     return token;
}

module.exports = {
    async register(req, res){        
        let id;
        do{
            try{
                id = crypto.randomBytes(6).toString('hex');
                const idTable = await User.findOne({
                    attributes: ["idUser"],
                    where: {
                        idUser: id,
                    }
                })
                if(!idTable){
                    break;
                }
                }catch(e){
                    res.status(500).json({"error": e.message});
                }

        }while(1)

        const idUser = id;

        try{
            const emailTable = await User.findOne({
                attributes: ["email"],
                where: {
                    email: req.body.email
                },
            })
            if(emailTable){
                return res.status(400).json({
                    "message": "E-mail já cadastrado",
                });
            }
        }catch(e){
            res.status(500).json({"error": e.message});
        }

        const { name, email } = req.body;

        //Encrypting password
        const password = await bcrypt.hash(req.body.password, 10);
        try{
            const user = await User.create({ idUser, name, email, password})
            user.password = undefined;
            const token = generateToken(user);
            res.status(201).json({ 
                user,
                token 
            });
        }catch(e){
            return res.status(500).json({
                "error": e.message,
            })
        }             
    },

    async login(req, res){
        try{

            const { email, password } = req.body;

            user = await User.findOne({
                where: {
                    "email": email,
                }
            });

            if(user){
                const passwordCorrect = await bcrypt.compare(password, user.password);

                if(passwordCorrect){
                    res.header("authorization", user.idUser);

                    const token = generateToken(user);

                    return res.status(201).json({
                        "message": "Autenticado com sucesso",
                        token,
                    });
                }
                
                res.header("authorization", user.idUser);
                return res.status(401).json({
                    "error": "Falha de autenticação"
                });
            }
            else{
                return res.status(401).json({
                    "error": "Falha de autenticação",
                });
            }
        } catch(e){
            return res.status(500).json({
                "error": e.message,
            })
        }
    },

    logout(req, res){
        res.status(200).json({
            token: null,
        })
    },

    async getUser(req, res) {
        const { idUser }  = req.body;

        try{
            const user = await User.findOne({
                where: {
                    idUser,
                }
            })
            data = new Date(user.createdAt);
            console.log(data.getHours());
            res.status(200).json(user);
        } catch(e) {
            res.status(400).json({
                error: e.message,
            })
        }
    },

    async changePassword(req, res){
        const { idUser, password } = req.body;

        let newPassword;
        try{
            newPassword = await bcrypt.hash(password, 10);
        } catch(e){
            res.status(400).json({
                "error": "Não foi possível alterar a senha",
            })
        }   

        const user = await User.update(
            {password: newPassword,},
            {
                where: {
                    idUser,
                },
            }
        );

        return res.status(200).json({
            "mensagem": "Senha alterada com sucesso",
            });
    },

    async recoverPassword(req, res){
        const { email } = req.body;


    }
}