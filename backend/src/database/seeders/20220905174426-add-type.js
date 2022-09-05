'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('types', [
      {
        type: 'Party',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Sports',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Meetup',
        photo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('types', {[Op.or]: [{type: 'Party'}, {type: 'Sports'}, {type: 'Meetup'}]});
    }
};
