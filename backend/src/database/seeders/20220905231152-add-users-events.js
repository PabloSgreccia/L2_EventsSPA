'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('users_events', [
      {
        id: 1,
        userId: 4,
        eventId: 1,
        favourite: 1,
        value: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 3,
        eventId: 1,
        favourite: 0,
        value: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 5,
        eventId: 1,
        favourite: 0,
        value: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 4,
        eventId: 2,
        favourite: 0,
        value: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 2,
        eventId: 4,
        favourite: 1,
        value: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('users_events', {[Op.or]: [{value: null}]});
    }
};
