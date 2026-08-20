'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Nettoyage initial pour éviter les conflits au redémarrage
    await queryInterface.bulkDelete('NormesFormulesPoudre', null, {});

    // Définition de votre structure de critères
    const criteresNormes = {
				arr:[]
			};

    // Insertion forcée et sécurisée
    await queryInterface.bulkInsert('NormesFormulesPoudre', [
      {
        // Conversion de l'objet JS en chaîne JSON compréhensible par PostgreSQL
        data: JSON.stringify(criteresNormes),
        UtilisateurId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NormesFormulesPoudre', null, {});
  }
};

