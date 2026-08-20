'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('utilisateurs', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      fName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      pseudo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depart_affecte: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Laboratoire central',
      },
      niv: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"niv_0"
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('utilisateurs');
  }
};
