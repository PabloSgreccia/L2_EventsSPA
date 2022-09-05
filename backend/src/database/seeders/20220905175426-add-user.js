const bcrypt = require('bcryptjs')
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('Admin123', 10),
        role: 'admin',
        photo: '',
        validated: 3,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        name: 'Pablo',
        email: 'pablo@gmail.com',
        password: await bcrypt.hash('Pablo123', 10),
        role: 'user',
        photo: '',
        validated: 1,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
    ], {}),
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('users', {[Op.or]: [{name: 'Admin'}, {name: 'Pablo'}]});
    }
};
