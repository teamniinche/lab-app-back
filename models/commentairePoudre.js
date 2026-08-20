'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CommentairePoudre extends Model {
    static associate(models) {
      // Association avec Utilisateur
      CommentairePoudre.belongsTo(models.Utilisateur, {
        foreignKey: {
          name: 'UtilisateurId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      // Association avec Analyse
      CommentairePoudre.belongsTo(models.AnalysePoudre, {
        foreignKey: {
          name: 'AnalyseId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  CommentairePoudre.init(
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
      modelName: 'CommentairePoudre',
      tableName: 'commentairesPoudre',
      timestamps: true,
    }
  );

  return CommentairePoudre;
};