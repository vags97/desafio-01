const { login } = require('../controllers/authController')
const { getCredits } = require('../controllers/creditsController')
const { getHomeInfo } = require('../controllers/homeController')

module.exports = function (app) {
  app.get('/', getHomeInfo)
  app.get('/credits', getCredits)
  app.post('/login', login)
}
