'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users_events.belongsTo(models.user, {
        foreignKey: 'userId',
        target_Key: 'id'
      })
      Users_events.belongsTo(models.event, {
        foreignKey: 'eventId',
        target_Key: 'id'
      })
      // Users_events.belongsToMany(models.user, {
      //   through: 'users_events'
      // })
      // Users_events.belongsToMany(models.event, {
      //   through: 'users_events'
      // })
    }
  }
 Users_events.init({
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    favourite: DataTypes.BOOLEAN,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_events',
  });
  return Users_events;
};