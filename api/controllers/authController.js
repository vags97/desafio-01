const { loginPostSchema } = require('../requests/authSchema')
const { User, Session } = require('../models')
const { Ipware } = require('@fullerstack/nax-ipware')

async function login (req, res, next) {
  const values = await loginPostSchema.validateAsync(req.body, { abortEarly: false })
  const user = await User.getUserDataWithEmail(values.email)
  if (!user) {
    return res.status(404).json({
      msg: 'Usuario no encontrado',
      error: {
        details: [
          {
            message: 'Usuario no encontrado',
            path: ['email']
          }
        ]
      }
    })
  }
  const validPassword = await user.validPassword(values.password)
  if (validPassword) {
    const sessionUserData = user.getSessionUserData()

    const ipware = new Ipware()
    const ip = ipware.getClientIP(req).ip
    const deviceInfo = req.headers['user-agent']
    const tokens = await Session.initSession(sessionUserData, ip, deviceInfo)
    return res.status(200).json({
      msg: 'Sesión iniciada correctamente',
      tokens
    })
  } else {
    return res.status(409).json({
      msg: 'Contraseña inválida',
      error: {
        details: [
          {
            message: 'Contraseña inválida',
            path: ['password']
          }
        ]
      }
    })
  }
}

module.exports = { login }
