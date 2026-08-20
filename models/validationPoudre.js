'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ValidationPoudre extends Model {
    static associate(models) {
      // Association avec Utilisateur
      ValidationPoudre.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      // Association avec Analyse
      ValidationPoudre.belongsTo(models.AnalysePoudre, {
        foreignKey: {
          name: 'AnalyseId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  ValidationPoudre.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      ok: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'ok',
      },
      validation: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'validation',
      }
    },
    {
      sequelize,
      modelName: 'ValidationPoudre',
      tableName: 'validationsPoudre',
      timestamps: true,
    }
  );

  return ValidationPoudre;
};