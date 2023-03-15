const Joi = require('joi')

const loginPostSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
})

module.exports = { loginPostSchema }
