'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('analyses', { 
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      machine: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reservoir: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      ph: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      parfum: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      matiere_active: {
        type: Sequelize.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
      },
      viscosite: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      densite: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      emuls: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      sapo: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      alcool: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      heure: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      masse: {
        type: Sequelize.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
      },
      volume: {
        type: Sequelize.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
      },
      caustique: {
        type: Sequelize.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
      },
      ratio: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      silicate: {
        type: Sequelize.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
      },
      durete: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      tds: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      categorie: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      observations: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'RAS',
      },
      UtilisateurId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'utilisateurs',
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('analyses');
  }
};
