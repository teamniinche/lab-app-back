'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Nettoyage initial pour éviter les conflits au redémarrage
    await queryInterface.bulkDelete('NormesPoudre', null, {});

    // Définition de votre structure de critères
    const criteresNormes = {

    local_1: {
      name: "Local 1",
      couleur: "white",
      taches: "red",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 270, max: 320 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 22.4, max: 24.4 }, required: true },
      alcanite: { normes: { min: 10.2, max: 12.2 }, required: true },
      silicate: { normes: { min: 15.8, max: 17.8 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    local_2_sacs: {
      name: "Local 2 sacs",
      couleur: "white",
      taches: "blue-red",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 230, max: 360 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 17, max: 19 }, required: true },
      alcanite: { normes: { min: 9, max: 11 }, required: true },
      silicate: { normes: { min: 16, max: 18 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    local_2_machine: {
      name: "Local 2 machine",
      couleur: "white",
      taches: "blue-red",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 280, max: 300 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 17, max: 19 }, required: true },
      alcanite: { normes: { min: 9, max: 11 }, required: true },
      silicate: { normes: { min: 16, max: 18 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    extra_1_sans_sel: {
      name: "Extra 1 sans sel",
      couleur: "white",
      taches: "blue",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 230, max: 260 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 14.5, max: 16.5 }, required: true },
      alcanite: { normes: { min: 8.8, max: 10.8 }, required: true },
      silicate: { normes: { min: 19, max: 21 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    extra_1_avec_sel: {
      name: "Extra 1 avec sel",
      couleur: "white",
      taches: "blue",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 230, max: 260 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 14.5, max: 16.5 }, required: true },
      alcanite: { normes: { min: 9, max: 11 }, required: true },
      silicate: { normes: { min: 16, max: 18 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    extra_1_sans_sel_export: {
      name: "Extra 1 sans sel export",
      couleur: "white",
      taches: "blue",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 280, max: 300 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 14.5, max: 16.5 }, required: true },
      alcanite: { normes: { min: 8.8, max: 10.8 }, required: true },
      silicate: { normes: { min: 19, max: 21 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    extra_1_avec_sel_export: {
      name: "Extra 1 avec sel export",
      couleur: "white",
      taches: "blue",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 280, max: 300 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 14.5, max: 16.5 }, required: true },
      alcanite: { normes: { min: 9, max: 11 }, required: true },
      silicate: { normes: { min: 16, max: 18 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    platinium_local: {
      name: "Platinium Local",
      couleur: "white",
      taches: null,
      max_gg: { normes: 1, required: true },
      densite: { normes: { min: 260, max: 320 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 19, max: 21 }, required: true },
      alcanite: { normes: { min: 9.5, max: 11.5 }, required: true },
      silicate: { normes: { min: 17, max: 19 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    get_1: {
      name: "Get 1",
      couleur: "white",
      taches: "blue",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 230, max: 270 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 12.9, max: 14.9 }, required: true },
      alcanite: { normes: { min: 10.1, max: 12.1 }, required: true },
      silicate: { normes: { min: 15, max: 17 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    get_1_export: {
      name: "Get 1 export",
      couleur: "white",
      taches: "blue",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 280, max: 300 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 12.9, max: 14.9 }, required: true },
      alcanite: { normes: { min: 10.1, max: 12.1 }, required: true },
      silicate: { normes: { min: 15, max: 17 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    get_2: {
      name: "Get 2",
      couleur: "white",
      taches: "red",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 230, max: 260 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 12.2, max: 14.2 }, required: true },
      alcanite: { normes: { min: 8, max: 10 }, required: true },
      silicate: { normes: { min: 13, max: 15 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    auto: {
      name: "Auto",
      couleur: "white",
      taches: null,
      max_gg: { normes: null, required: false },
      densite: { normes: { min: 300, max: 350 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 10, max: 12 }, required: true },
      alcanite: { normes: { min: 10, max: 12 }, required: true },
      silicate: { normes: { min: 11.8, max: 13.8 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    lansa_40: {
      name: "Lansa 40",
      couleur: "white",
      taches: null,
      max_gg: { normes: null, required: false },
      densite: { normes: { min: 250, max: 320 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 38.2, max: 40.2 }, required: true },
      alcanite: { normes: { min: 4.5, max: 6.5 }, required: true },
      silicate: { normes: { min: 11, max: 13 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    diam: {
      name: "Diam",
      couleur: "white",
      taches: "blue",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 230, max: 260 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 11.2, max: 13.2 }, required: true },
      alcanite: { normes: { min: 8.7, max: 10.7 }, required: true },
      silicate: { normes: { min: 15, max: 17 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    },
    diam_export: {
      name: "Diam export",
      couleur: "white",
      taches: "blue",
      max_gg: { normes: 3, required: true },
      densite: { normes: { min: 280, max: 300 }, required: true },
      max_humidite: { normes: 3, required: true },
      matiere_active: { normes: { min: 11.2, max: 13.2 }, required: true },
      alcanite: { normes: { min: 8.7, max: 10.7 }, required: true },
      silicate: { normes: { min: 15, max: 17 }, required: false },
      sel: { normes: { min: 8, max: 9 }, required: false }
    }
  
			};

    // Insertion forcée et sécurisée
    await queryInterface.bulkInsert('NormesPoudre', [
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
    await queryInterface.bulkDelete('NormesPoudre', null, {});
  }
};

