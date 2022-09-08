'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('types', [
      {
        id:1,
        type: 'Deportes',
        photo: '',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        type: 'Fiesta',
        photo: '',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        type: 'Recital',
        photo: '',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        type: 'Webinar',
        photo: '',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:5,
        type: 'Charla',
        photo: '',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:6,
        type: 'Otro',
        photo: '',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:7,
        type: 'Acto',
        photo: '',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('types', {[Op.or]: [{type: 'Party'}, {type: 'Sports'}, {type: 'Meetup'}]});
    }
};
