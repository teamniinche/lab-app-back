'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Analyse extends Model {
    static associate(models) {
      // =============== Association avec Utilisateur===================
      Analyse.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

          // Une analyse peut avoir plusieurs commentaires
      models.Analyse.hasMany(models.Commentaire, {
        foreignKey:'AnalyseId',
        as: 'commentaires',
      });

      models.Analyse.hasOne(models.Validation, {
        foreignKey:'AnalyseId',
        as: 'validation',
      });
    }
  }

  Analyse.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
      },
      machine: {
        type: DataTypes.STRING,
        allowNull: true,
	      field: 'machine',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
	      field: 'name',
      },
      reservoir: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
	      field: 'reservoir',
      },
      ph: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
	      field: 'ph',
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
	      field: 'color',
      },
      parfum: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
	      field: 'parfum',
      },
      matiere_active: {
        type: DataTypes.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
	      field: 'matiere_active',
      },
      viscosite: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
	      field: 'viscosite',
      },
      densite: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
        field: 'densite',
      },
      emuls: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
        field: 'emuls',
      },
      sapo: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
        field: 'sapo',
      },
      alcool: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        field: 'alcool',
      },
      heure: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
	      field: 'heure',
      },
      masse: {
        type: DataTypes.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
	      field: 'masse',
      },
      volume: {
        type: DataTypes.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
	      field: 'volume',
      },
      caustique: {
        type: DataTypes.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
	      field: 'caustique',
      },
      ratio: {
        type: DataTypes.FLOAT(3,2),
        allowNull: true,
        defaultValue: null,
        field: 'ratio',
      },
      silicate: {
        type: DataTypes.FLOAT(4,2),
        allowNull: true,
        defaultValue: null,
	      field: 'silicate',
      },
      durete: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
	      field: 'durete',
      },
      tds: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
	      field: 'tds',
      },
      categorie: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
	      field: 'categorie',
      },
      observations: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'RAS',
	      field: 'observations',
      },
      // 
      // auteurId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   defaultValue: 0,
	    //   field: 'nberOfImpacted',
      // },
    },
    {
      sequelize,
      modelName: 'Analyse',
      tableName: 'analyses',
      timestamps: true,
    }
  );

  return Analyse;
};
