const { Developer } = require('../models')

async function getCredits (req, res, next) {
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
}

module.exports = { getCredits }
