'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    static associate(models) {
      // Un utilisateur peut avoir plusieurs dons
      models.Utilisateur.hasMany(models.Analyse, {
        foreignKey: 'UtilisateurId', // Ne sera pas dupliquer dans Dons Table. C'est automatiquement ajouté
        as: 'analyses',
      });
    }
  }

  // "use_env_variable": "DATABASE_URL",
    // "dialect": "postgres",
    // "dialectOptions": {
    //   "ssl": {
    //     "require": true,
    //     "rejectUnauthorized": false
    //   }
    // }

  Utilisateur.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      fName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      depart_affecte: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Laboratoire central",
      },
      niv: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "niv_0",
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Utilisateur',
      tableName: 'utilisateurs',
      timestamps: true, 
    }
  );
  return Utilisateur;
};
