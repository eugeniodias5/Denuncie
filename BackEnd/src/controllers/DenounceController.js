const sequelize = require('sequelize');
const crypto = require('crypto');

const Denounce = require('../database/models/Denounce');

module.exports = {
    async register(req, res){
        const {idUser, uf, city, neighborhood, status, type, title, description } = req.body
        
        let id;
        do{
            try{
                id = crypto.randomBytes(6).toString('hex');
                const idTable = await Denounce.findOne({
                    attributes: ["idDenounce"],
                    where: {
                        idDenounce: id,
                    }
                })
                if(!idTable){
                    break;
                }
                }catch(e){
                    res.status(500).json({"error": e.message});
                }

        }while(1)

        const idDenounce = id;

        try{
            const denounce = await Denounce
            .create( { idDenounce, idUser, uf, city, neighborhood, status, type, title, description });

            return res.status(201).json(denounce);
        } catch(e) {
            return res.status(500).json(e.message);
        }
    },

    async list(req, res){
        let { page, ...filter } = req.query; 

        if(!page || page <= 0 || isNaN(page))
            page = 1;

        let offset = (page-1)*5;        

        try{
            const denounces = await Denounce.findAll({
                where: filter,
                order: [['createdAt', 'DESC']], 
                offset: offset, 
                limit: 5 
            })
            return res.status(200).json(denounces);
        } catch(e){
            return res.status(500).json({
                "error": e.message
            })
        }
    },

    async numPages(req, res){
        //Return the number of pages of denounces
        try{
            const numCases = await Denounce.count();
            const numPages = parseInt((numCases-1)/5) + 1;
            return res.status(200).json({
                "pages": numPages
            })
        } catch(e){
            return res.status(404).json({
                "error": e.message
            })
        }
    }
}