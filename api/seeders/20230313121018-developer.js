'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Developers', [{
      firstName: 'Vicente',
      lastName: 'Gamboa',
      email: 'vicente.gamboa@ug.uchile.cl',
      phone: '+56 9 82771055',
      linkedin: 'https://www.linkedin.com/in/vicente-gamboa-168933105',
      github: 'https://github.com/vags97',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Developers', null, {})
  }
}
