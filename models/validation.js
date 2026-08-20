'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Validation extends Model {
    static associate(models) {
      // Association avec Utilisateur
      Validation.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      // Association avec Analyse
      Validation.belongsTo(models.Analyse, {
        foreignKey: {
          name: 'AnalyseId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  Validation.init(
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
      modelName: 'Validation',
      tableName: 'validations',
      timestamps: true,
    }
  );

  return Validation;
};