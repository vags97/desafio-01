'use strict'
const {
  Model
} = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }

    static async getUserDataWithEmail (email) {
      return await User.findOne({
        attributes: [
          'id',
          'passwordHash',
          'email',
          'firstName',
          'lastName'
        ],
        where: {
          email
        }
      })
    }

    async validPassword (password) {
      return await bcrypt.compare(password, this.passwordHash)
    }

    getSessionUserData () {
      return (({
        id,
        firstName,
        lastName,
        email
      }) => ({
        id,
        firstName,
        lastName,
        email
      }))(this)
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        this.setDataValue('password', val)
        const salt = bcrypt.genSaltSync(8)
        const passwordHash = bcrypt.hashSync(val, salt)
        this.setDataValue('passwordHash', passwordHash)
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
