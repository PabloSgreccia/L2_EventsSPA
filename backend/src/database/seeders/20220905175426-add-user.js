const bcrypt = require('bcryptjs')
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('users', [
      {
        id: 1,
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
        id: 2,
        name: 'Pablo Sgreccia',
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
      {
        id: 3,
        name: 'Adelmar Galetto',
        email: 'adelmar@gmail.com',
        password: await bcrypt.hash('Adelmar123', 10),
        role: 'user',
        photo: '',
        validated: 2,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 4,
        name: 'Lucas Perez',
        email: 'lucar@gmail.com',
        password: await bcrypt.hash('Lucas123', 10),
        role: 'user',
        photo: '',
        validated: 1,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 5,
        name: 'Juan Fernandez',
        email: 'juan@gmail.com',
        password: await bcrypt.hash('Juan1234', 10),
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
      await queryInterface.bulkDelete('users', {[Op.or]: [{privacy: null}]});
    }
};
