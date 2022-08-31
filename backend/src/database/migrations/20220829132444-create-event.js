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
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      cancelled: {
        type: Sequelize.BOOLEAN
      },
      idType: {
        type: Sequelize.INTEGER,
        references:{
          model:'type',
          key:'id'
        }
      },
      idFoto: {
        type: Sequelize.INTEGER
      },
      idUser_admin: {
        type: Sequelize.INTEGER,
        references:{
          model:'user',
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