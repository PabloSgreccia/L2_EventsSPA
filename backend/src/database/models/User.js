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
        foreignKey: 'idUser'
      })
      User.belongsToMany(models.event, {
        through: 'users_events'
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
    idfoto: {
      type:DataTypes.INTEGER,
    },
    validated: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    privacy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};