'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.event, {
        foreignKey: 'idUser_admin'
      })
      User.hasMany(models.users_events, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type:DataTypes.STRING(255),
      allowNull:false
    },
    role: {
      type:DataTypes.STRING(5),
      allowNull:false,
      defaultValue:'user'
    },
    photo: {
      type:DataTypes.STRING,
    },
    validated: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    privacy: DataTypes.STRING,
    active:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    },
    validationCode:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};