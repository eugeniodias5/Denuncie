const {Sequelize, Model, DataTypes} = require('sequelize');

const connection = require('../connection');

class Denounce extends Model{};

Denounce.init({
        idDenounce: {
            type: DataTypes.STRING(12),
            allowNull: false,
            primaryKey: true,
            unique: true,
            validate: {
                len: [12, 12],
            },
          },
          idUser: {
            type: DataTypes.STRING(12),
            allowNull: true,
            references: {
              model: 'users',
              key: 'idUser',
            },
            unique: false,
          },
          uf: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                len: [2, 2],
            },
          },
          city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
          },
          neighborhood: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
          },
          status: {
            type: DataTypes.ENUM('TENTATIVA', 'CONCLUÍDO'),
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [['TENTATIVA', 'CONCLUÍDO']],
            },
          },
          type: {
            type: DataTypes.ENUM('AMEAÇA', 'ASSALTO', 'ASSASSINATO', 'ASSÉDIO', 'ESTUPRO', 'HOMICÍDIO', 'INVASÃO', 'ROUBO', 'LATROCÍNIO', 'OUTROS'),
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [['AMEAÇA', 'ASSALTO', 'ASSASSINATO', 'ASSÉDIO', 'ESTUPRO', 'HOMICÍDIO', 'INVASÃO', 'ROUBO', 'LATROCÍNIO', 'OUTROS']],
            }
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [5, 85],
            }
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
              len: [0, 400],
            }
          },
        }, 
    {
        sequelize: connection,
        modelName: 'denounces',
    });

module.exports = Denounce;