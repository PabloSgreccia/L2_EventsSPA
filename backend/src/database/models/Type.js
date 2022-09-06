'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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