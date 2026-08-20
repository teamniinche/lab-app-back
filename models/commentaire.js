'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    static associate(models) {
      // Association avec Utilisateur
      Commentaire.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      // Association avec Analyse
      Commentaire.belongsTo(models.Analyse, {
        foreignKey: {
          name: 'AnalyseId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  Commentaire.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'text',
      },
      views: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: []
      },
    },
    {
      sequelize,
      modelName: 'Commentaire',
      tableName: 'commentaires',
      timestamps: true,
    }
  );

  return Commentaire;
};