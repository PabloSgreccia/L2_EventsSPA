'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('users_events', [
      {
        id: 1,
        userId: 2,
        eventId: 2,
        favourite: 1,
        value: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],)

    var randomData = [];
    
    for (let i = 9; i < 500; i++) {
        const seedData = {
          id: i,
          userId: i,
          eventId: Math.floor(Math.random() * (8 - 1)) + 1,
          favourite: 0,
          value: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        randomData.push(seedData);
    }

    queryInterface.bulkInsert('users_events', randomData);
},
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('users_events', {[Op.or]: [{value: null}]});
    }
};
