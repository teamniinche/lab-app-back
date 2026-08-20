'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Norme extends Model {
    static associate(models) {
        // Association avec Utilisateur
      Norme.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  Norme.init(
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
      modelName: 'Norme',
      tableName: 'Normes',
      timestamps: true
    }
  );

  return Norme;
};
