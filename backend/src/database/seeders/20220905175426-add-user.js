require('dotenv').config();
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker');
const IMGURL = `${process.env.PHOTO}images/default/users`
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('Admin123', 10),
        role: 'admin',
        photo: `${IMGURL}/admin.jpg`,
        validated: 3,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 2,
        name: 'Tini Stoessel',
        email: 'tini@gmail.com',
        password: await bcrypt.hash('Tini1234', 10),
        role: 'user',
        photo: `${IMGURL}/tini.jpg`,
        validated: 3,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 3,
        name: 'Boca Jrs',
        email: 'boca@gmail.com',
        password: await bcrypt.hash('Boca1234', 10),
        role: 'user',
        photo: `${IMGURL}/boca.jpg`,
        validated: 1,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 4,
        name: 'Bound Rosario',
        email: 'bound@gmail.com',
        password: await bcrypt.hash('Bound123', 10),
        role: 'user',
        photo: `${IMGURL}/bound.jpg`,
        validated: 1,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 5,
        name: 'DF Entertainment',
        email: 'df@gmail.com',
        password: await bcrypt.hash('Df123456', 10),
        role: 'user',
        photo: `${IMGURL}/df.jpg`,
        validated: 1,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 6,
        name: 'La Segunda',
        email: 'lasegunda@gmail.com',
        password: await bcrypt.hash('Lasegunda123', 10),
        role: 'user',
        photo: `${IMGURL}/lasegunda.jpg`,
        validated: 3,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 7,
        name: 'Rosario Municipalidad',
        email: 'rosario@gmail.com',
        password: await bcrypt.hash('Rosario123', 10),
        role: 'user',
        photo: `${IMGURL}/rosario.jpg`,
        validated: 3,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 8,
        name: 'Amazon Web Services',
        email: 'amazon@gmail.com',
        password: await bcrypt.hash('Amazon123', 10),
        role: 'user',
        photo: `${IMGURL}/aws.jpg`,
        validated: 1,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 9,
        name: 'Juan Perez',
        email: 'juan@gmail.com',
        password: await bcrypt.hash('Juan1234', 10),
        role: 'user',
        photo: `${IMGURL}/juan.jpg`,
        validated: 1,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
      {
        id: 10,
        name: 'Lucía Gomez',
        email: 'lucia@gmail.com',
        password: await bcrypt.hash('Lucia123', 10),
        role: 'user',
        photo: `${IMGURL}/lucia.jpg`,
        validated: 1,
        privacy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: 1,
        validationCode: null
      },
    ],)

    let randomData = [];
    const notRandomNumbers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
    for (let i = 11; i < 500; i++) {
        const seedData = {
          id: i,
          name: faker.name.fullName(),
          email: faker.internet.email(),
          password: await bcrypt.hash('User123', 10),
          role: 'user',
          photo: 'https://thumbsnap.com/s/WeDacXjq.jpg',
          validated: notRandomNumbers[Math.floor(Math.random() * notRandomNumbers.length)],
          privacy: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          active: 1,
          validationCode: null
        };
        randomData.push(seedData);
    }

    queryInterface.bulkInsert('users', randomData);

  },
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('users', {[Op.or]: [{privacy: null}]});
    }
};


