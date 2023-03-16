const { Session } = require('../models')

async function requiredAuth (req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const accessToken = req.headers.authorization.split(' ')[1]
    await Session.verifyToken(accessToken, 'AT')
      .then(async ({ sessionUserData }) => {
        req.sessionUserData = sessionUserData
        return next()
      }).catch((error) => {
        let status = 500
        if (error === 'Invalid credentials') {
          status = 401
        }
        return res.status(status).json({ msg: error })
      })
  } else {
    return res.status(401).json({
      msg: 'Sin credenciales de autorización'
    })
  }
}

module.exports = requiredAuth
