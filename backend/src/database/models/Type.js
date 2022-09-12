'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    
    static associate(models) {
      Type.hasMany(models.event, {
        foreignKey: 'idType'
      })
    }
  }
  Type.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
  }, {
    sequelize,
    modelName: 'type',
  });
  return Type;
};