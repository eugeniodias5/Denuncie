'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('denounces', {
      idDenounce: {
        type: Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      idUser: {
        type: Sequelize.STRING(12),
        allowNull: true,
        references: {
          model: 'users',
          key: 'idUser',
        },
        unique: false,
      },
      uf: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('TENTATIVA', 'CONCLUÍDO'),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('AMEAÇA', 'ASSALTO', 'ASSASSINATO', 'ASSÉDIO', 'ESTUPRO', 'HOMICÍDIO', 'INVASÃO', 'ROUBO', 'LATROCÍNIO', 'OUTROS'),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('denounces');
  }
};
