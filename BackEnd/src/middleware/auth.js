const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
        const header = req.headers['authorization']

        if(!header.startsWith('Bearer '))
            res.status(401).json({
                "error": "Falha na autenticação",
            })
            
        const token = header.slice(7, header.length);

        if(!token)
        res.status(401).json({
            "error": "Falha na autenticação",
        })

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err)
                res.status(401).json({
                    "error": err.message,
                })
            req.body.idUser = decoded.idUser;
            req.body.name = decoded.name;
            req.body.email = decoded.email;
            return next();
        })
    }