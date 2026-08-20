'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NormePoudre extends Model {
    static associate(models) {
        // Association avec Utilisateur
      NormePoudre.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  NormePoudre.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // false, //On force id = 1
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false
      }
    },
    {
      sequelize, // 👈 obligatoire sinon Sequelize ne connecte pas le modèle
      modelName: 'NormePoudre',
      tableName: 'NormesPoudre',
      timestamps: true
    }
  );

  return NormePoudre;
};
