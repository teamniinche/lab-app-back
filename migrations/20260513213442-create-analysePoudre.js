'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('analysesPoudre', { 
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
      },
      nChar: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      identifier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      taches: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      parfum: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lansa: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:null,
      },
      categorie: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      format: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      matiere_active: {
        type: Sequelize.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
      },
      alcanite: {
        type: Sequelize.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
      },
      humidite: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      gg: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      silicate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      sel: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      densite: {
        type: Sequelize.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
      },
      compression: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      percarbonate: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      mousses: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      observations: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'RAS',
      },
      ok: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
            status: false,
            validation: null
        }
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
    await queryInterface.dropTable('analysesPoudre');
  }
};
