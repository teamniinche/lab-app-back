'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Nettoyage initial pour éviter les conflits au redémarrage
    await queryInterface.bulkDelete('Normes', null, {});

    // Définition de votre structure de critères
    const criteresNormes = {
	caustic: {
    prctageCaustic: {
      min: "",
      max: ""
    },
    codor_normes: {
      hasColor: true,
      color: false,
      parfum: "N/A"
    }
  },
  silicate: {
    prctageSilicate: {
      min: "",
      max: ""
    },
    codor_normes: {
      hasColor: true,
      color: false,
      parfum: "N/A"
    }
  },
  renzo_madar: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Citron"
    },
    ph_normes: {
      min: 7.8,
      max: 8.2
    },
    matiere_active_normes: {
      min: 15,
      max: 16.5,
      coef: 14.41
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  renzo_noura: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Citron"
    },
    ph_normes: {
      min: 7.6,
      max: 8.2
    },
    matiere_active_normes: {
      min: 13.6,
      max: 14.7,
      coef: 14.8
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  noura_platinium: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Orange"
    },
    ph_normes: {
      min: 7,
      max: 7.8
    },
    matiere_active_normes: {
      min: 13.6,
      max: 14.7,
      coef: 14.7
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  noura_premium: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Lavander"
    },
    ph_normes: {
      min: 7,
      max: 7.8
    },
    matiere_active_normes: {
      min: 13.6,
      max: 14.7,
      coef: 14.7
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  renzo_platinium: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Orange"
    },
    ph_normes: {
      min: 7.1,
      max: 7.8
    },
    matiere_active_normes: {
      min: 15,
      max: 16.5,
      coef: 14.41
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  renzo_premium: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Lavander"
    },
    ph_normes: {
      min: 7,
      max: 7.8
    },
    matiere_active_normes: {
      min: 15,
      max: 16.5,
      coef: 14.41
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  get_platinium: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Orange"
    },
    ph_normes: {
      min: 7,
      max: 7.8
    },
    matiere_active_normes: {
      min: 9.5,
      max: 10.5,
      coef: 14.73
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  get_citron: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Citron"
    },
    ph_normes: {
      min: 7.6,
      max: 8.2
    },
    matiere_active_normes: {
      min: 9.5,
      max: 10.5,
      coef: 14.73
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  lave_bois: {
    codor_normes: {
      hasColor: true,
      color: "#c76927",
      parfum: "Citron"
    },
    ph_normes: {
      min: 7,
      max: 8
    },
    densite_normes: {
      min: 0.9,
      max: 1
    }
  },
  madar_lave_vitre: {
    codor_normes: {
      hasColor: true,
      color: "#0a9fc4",
      parfum: "Normal"
    },
    ph_normes: {
      min: 9.01,
      max: 11
    },
    densite_normes: {
      min: 0.98,
      max: 0.99
    },
    matiere_active_normes: {
      min: 8,
      max: 10
    }
  },
  noura_lave_vitre: {
    codor_normes: {
      hasColor: true,
      color: "#8c3109",
      parfum: "Normal"
    },
    ph_normes: {
      min: 9,
      max: 11
    },
    densite_normes: {
      min: 0.99,
      max: 1
    },
    matiere_active_normes: {
      min: 2.5,
      max: 3.5
    }
  },
  noura_net: {
    codor_normes: {
      categorie: "liquides vaisselle",
      hasColor: true,
      color: {
        citron: "#b8ff05",
        rose: "pink",
        flamboise: "#d20606",
        lavander: "red",
        fama: "#b8ff05"
      },
      parfum: {
        jaune: "Citron",
        rose: "Rose",
        rouge: "Flamboise",
        violet: "Lavander",
        vert: "Fama"
      }
    },
    ph_normes: {
      min: 7,
      max: 8
    },
    matiere_active_normes: {
      min: 1,
      max: 1.1
    },
    densite_normes: {
      min: 0.99,
      max: 1
    }
  },
  lave_main_noura: {
    codor_normes: {
      categorie: "cosmetique",
      hasColor: true,
      color: {
        citron: "#b8ff05",
        rose: "pink",
        fraise: "#d20606",
        lavander: "#8103ff",
        pomme: "#b8ff05",
        marseille: "white"
      },
      parfum: {
        jaune: "Citron",
        rose: "Rose",
        rouge: "Fraise",
        violet: "Lavander",
        vert: "Pomme",
        blanc: "Marseille"
      }
    },
    ph_normes: {
      min: 5.5,
      max: 6.5
    },
    viscosite_normes: {
      min: 3000,
      max: 6000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    },
    matiere_active_normes: {
      min: 5,
      max: 7,
      coef: 14.83
    }
  },
  lave_main_madar: {
    codor_normes: {
      categorie: "cosmetique",
      hasColor: true,
      color: {
        rouge: "#d20606",
        marron: "#c76927",
        blanc: "white",
        orange: "#ff5f03",
        jaune: "yellow"
      },
      parfum: {
        rouge: "Fruit",
        marron: "Vanille",
        blanc: "Marseille",
        orange: "Passion",
        jaune: "Citron"
      }
    },
    ph_normes: {
      min: 5.5,
      max: 6.5
    },
    viscosite_normes: {
      min: 3000,
      max: 6000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    },
    matiere_active_normes: {
      min: 5.5,
      max: 7.5,
      coef: 14.83
    }
  },
  dentifrice: {
    codor_normes: {
      hasColor: true,
      color: {
        blanc: "white",
        rouge: "#d20606",
        bleu: "#0a9fc4",
        noir: "black"
      },
      parfum: "Normal"
    },
    ph_normes: {
      min: 6,
      max: 7.5
    },
    viscosite_normes: {
      blanc: {
        min: 450,
         max: 650
      },
      rouge: {
        min: 300,
        max: 450
      },
      bleu: {
        min: 400,
        max: 600
      },
      noir: {
        min: 450,
        max: 650
      }
    },
    densite_normes: {
      min: 1.28,
      max: 1.32
    }
  },
  matiz_savon_liquide: {
    codor_normes: {
      categorie: "cosmetique",
      hasColor: true,
      color: {
        rose: "pink",
        vert: "#b8ff05"
      },
      parfum: {
        rose: "Fraise",
        vert: "Pomme"
      }
    },
    ph_normes: {
      min: 5.5,
      max: 6.5
    },
    viscosite_normes: {
      min: 3000,
      max: 6000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    },
    matiere_active_normes: {
      min: 5,
      max: 7,
      coef: 15.8
    }
  },
  supermore: {
    codor_normes: {
      categorie: "cosmetique",
      hasColor: true,
      color: {
        colombien: "whitesmoke",
        presioso: "whitesmoke",
        infini: "whitesmoke",
        tropical: "whitesmoke"
      },
      parfum: {
        colombien: "Peche",
        presioso: "Pastheque",
        infini: "Cantaloup",
        tropical: "Ananas"
      }
    },
    ph_normes: {
      min: 4.5,
      max: 6.5
    },
    densite_normes: {
      min: 0.9,
      max: 1
    }
  },
  matiz_vasiline: {},
  get_premium: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Lavander"
    },
    ph_normes: {
      min: 7,
      max: 7.8
    },
    matiere_active_normes: {
      min: 9.5,
      max: 10.5,
      coef: 14.73
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  noura_2_citron: {
    codor_normes: {
      hasColor: true,
      color: true,
      parfum: "Citron"
    },
    ph_normes: {
      min: 7.6,
      max: 8.2
    },
    matiere_active_normes: {
      min: 13.6,
      max: 14.7,
      coef: 14.7
    },
    viscosite_normes: {
      min: 4000,
      max: 8000
    },
    densite_normes: {
      min: 1.025,
      max: 1.03
    }
  },
  get_tol: {
    codor_normes: {
      hasColor: true,
      color: "#8c3109",
      parfum: "Normal"
    },
    ph_normes: {
      min: 9,
      max: 11
    },
    densite_normes: {
      min: 0.99,
      max: 1
    },
    matiere_active_normes: {
      min: 2.5,
      max: 3.5
    }
  }
		};

    // Insertion forcée et sécurisée
    await queryInterface.bulkInsert('Normes', [
      {
        // Conversion de l'objet JS en chaîne JSON compréhensible par PostgreSQL
        data: JSON.stringify(criteresNormes),
        UtilisateurId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Normes', null, {});
  }
};

