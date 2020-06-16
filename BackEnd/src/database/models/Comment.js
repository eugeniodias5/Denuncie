const { Sequelize, Model, DataTypes } = require('sequelize');

const connection = require('../connection');

class Comment extends Model{};

Comment.init({
    idComment: {
        primaryKey: true,
        type: DataTypes.STRING(12),
        unique: true,
        allowNull: false,
        validate: {
            len: [12, 12],
        }
    },
    idDenounce: {
        references: {
            model: 'denounces',
            key: 'idDenounce',
        },
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: false,
        validate: {
            len: [12, 12],
        }
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    sequelize: connection,
    modelName: 'comments',
});

module.exports = Comment;