'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      mode: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      link: {
        type: Sequelize.STRING
      },
      init_date: {
        type: Sequelize.STRING
      },
      end_date: {
        type: Sequelize.STRING
      },
      cancelled: {
        type: Sequelize.BOOLEAN
      },
      idType: {
        type: Sequelize.INTEGER,
        references:{
          model:'types',
          key:'id'
        }
      },
      photo: {
        type: Sequelize.STRING
      },
      idUser_admin: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
      },
      finished: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};