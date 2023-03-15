'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      refreshTokenHash: {
        type: Sequelize.STRING(64)
      },
      deviceInfo: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lng: {
        type: Sequelize.FLOAT
      },
      locationRadius: {
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING(200)
      },
      city: {
        type: Sequelize.STRING(200)
      },
      ip: {
        type: Sequelize.STRING(200)
      },
      expireDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions')
  }
}
