'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    static associate(models) {
      // =============== Association avec Utilisateur===================
      Action.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  Action.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
      },
       action: {
        type: DataTypes.STRING,
        allowNull: false,
	      field: 'action',
      }
    },
   
    {
      sequelize,
      modelName: 'Action',
      tableName: 'actions',
      timestamps: true,
    }
  );

  return Action;
};
