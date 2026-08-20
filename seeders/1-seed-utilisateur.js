'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('utilisateurs', [{
      fName: 'Mamadou',
      // Code secret pré-haché équivalent à "password"
      password: "$2a$10$X7.mQ1Z3S6Vpx/8L6H0fSu278N.9C/m6JreO8Y0Gk2XvO4S694rK2",
      lName: 'Ndr',
      tel: '771628021',
      url: 'ndour.jpg',
      email: 'ndourm910@gmail.com',
      pseudo: 'ndr',
      niv: 'can_6',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Utilisation explicite du WHERE pour éviter les comportements imprévus
    await queryInterface.bulkDelete('utilisateurs', { pseudo: 'ndr' }, {});
  }
};
