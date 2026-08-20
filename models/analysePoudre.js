'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AnalysePoudre extends Model {
    static associate(models) {
      // =============== Association avec Utilisateur===================
      AnalysePoudre.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: true,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

          // Une analyse peut avoir plusieurs commentaires
      models.AnalysePoudre.hasMany(models.CommentairePoudre, {
        foreignKey:'AnalyseId',
        as: 'commentaires',
      });

      models.AnalysePoudre.hasOne(models.ValidationPoudre, {
        foreignKey:'AnalyseId',
        as: 'validation',
      });
    }
  }

  AnalysePoudre.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      nChar: {
        type: DataTypes.INTEGER,
        allowNull: false,
          field: 'nChar',
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
          field: 'identifier',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
          field: 'name',
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: true,
          field: 'nom',
      },
      taches: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
          field: 'taches',
      },
      parfum: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
          field: 'parfum',
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
          field: 'type',
      },
      lansa: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
          field: 'lansa',
      },
      categorie: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'categorie',
      },
      format: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        field: 'format',
      },
      matiere_active: {
        type: DataTypes.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
          field: 'matiere_active',
      },
      alcanite: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
          field: 'alcanite',
      },
      humidite: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
          field: 'humidite',
      },
      gg: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
          field: 'gg',
      },
      silicate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
          field: 'silicate',
      },
      sel: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
        field: 'sel',
      },
      densite: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
        field: 'densite',
      },
      compression: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        field: 'compression',
      },
      percarbonate: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        field: 'percarbonate',
      },
      mousses: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
          field: 'mousses',
      },
      observations: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'RAS',
        field: 'observations',
      },
      ok: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
            status: false,
            validation: null
        }
    }
    },
    {
      sequelize,
      modelName: 'AnalysePoudre',
      tableName: 'analysesPoudre',
      timestamps: true,
    }
  );

  return AnalysePoudre;
};
