'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('NormesFormulesPoudre', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      data: {
        type: Sequelize.JSON,
        allowNull: false
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
	      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
	      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
     // 🔃 Insère l'enregistrement initial avec id = 1
    await queryInterface.bulkInsert('NormesFormulesPoudre', [
      {
        id: 1,
        data: JSON.stringify({
          eau: { min: 10, max: 20 },
          alcool: { min: 5, max: 15 }
        }),
        UtilisateurId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  
  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('NormesFormulesPoudre');

  }
};
