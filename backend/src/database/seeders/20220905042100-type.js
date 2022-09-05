'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('types', [{
      type: 'Fest',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      type: 'Sports',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('types', null, {});
  }
};
