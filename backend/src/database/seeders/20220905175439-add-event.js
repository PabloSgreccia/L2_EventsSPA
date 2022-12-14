require('dotenv').config();
const IMGURL = `${process.env.PHOTO}images/default/events`
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('events', [
      {
        id: 1,
        title: 'Boca vs River',
        description: 'Nos visita River Plate en la bombonera por la 8va fecha del torneo nacional. \nValor entrada: $5000 ',
        mode: 'mixed',
        province: 'Buenos Aires',
        city: 'BOCA',
        street: 'Brandsen',
        number: 805,
        link: 'www.bocajuniors.com.ar',
        init_date: 'Fri Nov 25 2022 21:00:00 GMT-0300 (hora estándar de Argentina)',
        end_date: 'Fri Nov 25 2022 23:00:00 GMT-0300 (hora estándar de Argentina)',
        cancelled: 1,
        idType: 1,
        photo: `${IMGURL}/bombonera.jpg`,
        idUser_admin: 3,
        finished: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'DJs Fran Arias y Pato Oteo en Bound',
        description: 'No te pierdas esta noche donde traemos dos DJs invitados especiales',
        mode: 'site',
        province: 'Santa Fe',
        city: 'ROSARIO',
        street: 'Bv. Oroño',
        number: 198,
        link: '',
        init_date: 'Sat Sep 15 2022 22:00:00 GMT-0300 (hora estándar de Argentina)',
        end_date: 'Sun Sep 15 2022 5:00:00 GMT-0300 (hora estándar de Argentina)',
        cancelled: 0,
        idType: 2,
        photo: `${IMGURL}/bound.jpg`,
        idUser_admin: 4,
        finished: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'Coldplay en Argentina',
        description: 'Tenemos para vos 10 funciones de colplay',
        mode: 'site',
        province: 'Buenos Aires',
        city: 'PALERMO',
        street: 'Av. Pres. Figueroa',
        number: 7597,
        link: '',
        init_date: 'Tue Oct 25 2022 00:00:00 GMT-0300 (hora estándar de Argentina)',
        end_date: 'Tue Nov 08 2022 5:00:00 GMT-0300 (hora estándar de Argentina)',
        cancelled: 0,
        idType: 3,
        photo: `${IMGURL}/coldplay.jpg`,
        idUser_admin: 5,
        finished: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: 'Webinar Privacidad de Datos',
        description: 'Tenemos este webinar diseñado para vos, con los invitados Mark Zukerberg y nuestro queridísimo Jeff Bezos, quienes darán un interesante debate sobre la privacidad y proteccion de datos en diferentes plataformas',
        mode: 'virtual',
        province: '',
        city: '',
        street: '',
        number: null,
        link: 'www.amazon.com/webinar/datos',
        init_date: 'Wed Sep 21 2022 11:00:00 GMT-0300 (hora estándar de Argentina)',
        end_date: 'Wed Sep 21 2022 13:00:00 GMT-0300 (hora estándar de Argentina)',
        cancelled: 0,
        idType: 4,
        photo: `${IMGURL}/datosaws.jpg`,
        idUser_admin: 8,
        finished: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        title: 'Mano a mano con Ginóbili',
        description: 'Imperdible charla con Gonzalo Bonadeo y Fabricio Oberto, Manu habla sobre su carrera, el deporte y los valores. \nAdquiri tu entrada o escuchala vitualmente',
        mode: 'mixed',
        province: 'Santa Fe',
        city: 'ROSARIO',
        street: 'Av. Francia Bis',
        number: 50,
        link: 'www.lasegunda.com.ar',
        init_date: 'Thu Sep 17 2022 20:00:00 GMT-0300 (hora estándar de Argentina)',
        end_date: 'Thu Sep 17 2022 22:00:00 GMT-0300 (hora estándar de Argentina)',
        cancelled: 0,
        idType: 5,
        photo: `${IMGURL}/ginobili.jpg`,
        idUser_admin: 6,
        finished: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        title: 'Final del mundial',
        description: 'Vení a alentar a la seleccion en la final del mundial de 2022. \nProyectaremos el partido de la seleccion en el monumento.',
        mode: 'site',
        province: 'Santa Fe',
        city: 'ROSARIO',
        street: 'Sta Fe',
        number: 581,
        link: '',
        init_date: 'Sun Dec 18 2022 12:00:00 GMT-0300 (hora estándar de Argentina)',
        end_date: 'Sun Dec 18 2022 14:00:00 GMT-0300 (hora estándar de Argentina)',
        cancelled: 0,
        idType: 1,
        photo: `${IMGURL}/mundial.jpg`,
        idUser_admin: 7,
        finished: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        title: 'Jornada de reciclado',
        description: 'Trae todos tus elemtos reciclables. \nJuntos hagamos un mundo mas limpio y sustentable',
        mode: 'site',
        province: 'Santa Fe',
        city: 'ROSARIO',
        street: 'Bv. Oroño',
        number: 1840,
        link: '',
        init_date: 'Mon Sep 05 2022 09:00:00 GMT-0300 (hora estándar de Argentina)',
        end_date: 'Mon Sep 05 2022 15:00:00 GMT-0300 (hora estándar de Argentina)',
        cancelled: 0,
        idType: 6,
        photo: `${IMGURL}/reciclaje.jpg`,
        idUser_admin: 7,
        finished: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        title: 'Exposición proyecto final',
        description: 'Adelmar Galetto y Pablo Sgreccia presentarán "Sharvent", su proyecto final en el curso de "Desarrollador Fullstack" dictado por UTN y La Segunda.',
        mode: 'virtual',
        province: '',
        city: '',
        street: '',
        number: '',
        link: 'zoom.us/j/83357541070',
        init_date: 'Tue Sep 13 2022 18:00:00 GMT-0300 (hora estándar de Argentina)',
        end_date: 'Tue Sep 13 2022 22:00:00 GMT-0300 (hora estándar de Argentina)',
        cancelled: 0,
        idType: 5,
        photo: `${IMGURL}/curso.jpg`,
        idUser_admin: 6,
        finished: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('events', {[Op.or]: [{photo: ''}]});
    }
};
