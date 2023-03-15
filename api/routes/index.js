const { getCredits } = require('../controllers/creditsController')
const { getHomeInfo } = require('../controllers/homeController')

module.exports = function (app) {
  app.get('/', getHomeInfo)
  app.get('/credits', getCredits)
}
