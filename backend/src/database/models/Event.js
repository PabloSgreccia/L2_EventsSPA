'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.user, {
        foreignKey: 'id',
        target_Key: 'idUser_admin'
      })
      Event.belongsTo(models.type, {
        foreignKey: 'id',
        target_Key: 'idType'
      })
      Event.belongsToMany(models.user, {
        through: 'users_events'
      })
    }
  }
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    mode: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    link: DataTypes.STRING,
    init_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    idType: DataTypes.INTEGER,
    foto: DataTypes.STRING,
    idUser_admin: DataTypes.INTEGER,
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'event',
  });
  return Event;
};