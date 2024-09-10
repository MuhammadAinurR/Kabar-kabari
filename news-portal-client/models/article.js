'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      })
      Article.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title should not empty'
        },
        notEmpty: {
          args: true,
          msg: 'Title should not empty'
        },
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Content should not empty'
        },
        notEmpty: {
          args: true,
          msg: 'Content should not empty'
        },
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Category should not empty'
        },
        notEmpty: {
          args: true,
          msg: 'Category not empty'
        },
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Author ID should not empty'
        },
        notEmpty: {
          args: true,
          msg: 'Author ID should not empty'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};