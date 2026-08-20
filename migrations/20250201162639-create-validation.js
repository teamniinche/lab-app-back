'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('validations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ok: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      validation:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      UtilisateurId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'utilisateurs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      AnalyseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'analyses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
	      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
	      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('validations');
  },
};