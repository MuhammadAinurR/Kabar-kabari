'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Article, {
        foreignKey: 'authorId'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email has been registered'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Email should not null'
        },
        notEmpty: {
          args: true,
          msg: 'Email should not empty'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password should not null'
        },
        notEmpty: {
          args: true,
          msg: 'Password should not empty'
        },
        len: {
          args: [5, 100],
          msg: 'Password length should more than 5'
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Staff',
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password);
        user.role = 'Staff';
      }
    }
  });
  return User;
};