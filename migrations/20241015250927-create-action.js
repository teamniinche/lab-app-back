'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('actions', { 
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('actions');
  }
};
