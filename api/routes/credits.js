const express = require('express')
const { Developer } = require('../models')
const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const developers = await Developer.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
      'linkedin',
      'github'
    ],
    order: [['lastName', 'ASC']]
  })
  res.status(200).json(developers)
})

module.exports = router
