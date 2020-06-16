const {Sequelize, Model, DataTypes} = require('sequelize');

const connection = require('../connection');

class User extends Model{};

User.init({
    idUser: {
        primaryKey: true,
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true,
        validate: {
            len: [12, 12],
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
},
    {
        sequelize: connection,
        modelName: 'users',
    }
)

module.exports = User;