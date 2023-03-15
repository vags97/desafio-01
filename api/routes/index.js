const { login } = require('../controllers/authController')
const { getCredits } = require('../controllers/creditsController')
const { getHomeInfo } = require('../controllers/homeController')
const { generateFileAnalysis, getEvents, getEventInfo } = require('../controllers/fileController')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = function (app) {
  app.get('/', getHomeInfo)
  app.get('/credits', getCredits)
  app.post('/login', login)
  app.post('/file', upload.single('file'), generateFileAnalysis)
  app.get('/file', getEvents)
  app.get('/event/:id', getEventInfo)
}
