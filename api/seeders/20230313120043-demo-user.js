'use strict'

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(8)
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Vicente',
      lastName: 'Gamboa',
      email: 'example@example.com',
      passwordHash: bcrypt.hashSync('123456', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
