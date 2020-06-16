const Sequelize = require('sequelize');
const crypto = require('crypto');

const Comment = require('../database/models/Comment');

module.exports = {
    async register(req, res) {
        const {idDenounce, body} = req.body;

        const idComment = crypto.randomBytes(6).toString('hex');

        try{
            const comment = await Comment.create({
                idComment,
                idDenounce,
                body,
            })

            res.status(201).json(comment);
        }
        catch(e){
            res.status(500).json({
                error: 'Não foi possível fazer o comentário',
            })
        }
    },

    async list(req, res) {
        const { idDenounce } = req.params;
        try{
            const comments = await Comment.findAll({
                where: {
                    idDenounce,
                },
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
            res.status(200).json(comments);

        } catch(e){
            res.status(404).json({
                error: "Não foi possível listar os comentários",
            })
        }
    }
}