'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Article,{
        foreignKey: 'categoryId'
      } )
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Category Name Should Not Empty'
        },
        notEmpty: {
          args: true,
          msg: 'Category Name Should Not Empty'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};