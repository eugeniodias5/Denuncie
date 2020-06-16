'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
      idComment: {
        type: Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      idDenounce: {
        type: Sequelize.STRING(12),
        unique: false,
        allowNull: false,
        references: {
            model: 'denounces',
            key: 'idDenounce',
        },
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    return queryInterface.dropTable('comments');
  }
};
