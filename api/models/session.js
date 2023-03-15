'use strict'
const {
  Model
} = require('sequelize')
const { createHash } = require('node:crypto')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const geoip = require('fast-geoip')

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static async verifyToken (token, tokenType) {
      const verify = promisify(jwt.verify)
      const secret = process.env.JWT_TOKEN ? process.env.JWT_TOKEN : 'secret'
      try {
        const decoded = await verify(token, secret, undefined)

        if (decoded.jty !== tokenType) {
          throw new Error(`Incorrect token type. Expected: ${tokenType}`)
        }

        return decoded
      } catch (e) {
        console.log('error decoding token', e)
        throw new Error('Invalid credentials')
      }
    }

    static async getGeoData (ip) {
      const geo = await geoip.lookup(ip)
      return {
        locationCoordinates: geo.ll,
        locationRadius: geo.area,
        country: geo.country,
        city: geo.city
      }
    }

    static async initSession (sessionUserData, ip, deviceInfo) {
      const { accessToken, refreshToken, expireDate } = await this.generateTokens(sessionUserData)
      const { id: userId } = sessionUserData
      const { locationCoordinates, locationRadius, country, city } = await this.getGeoData(ip)

      const [lng, lat] = locationCoordinates

      const sessionData = {
        userId,
        refreshToken,
        deviceInfo,
        locationRadius,
        country,
        city,
        ip,
        lng,
        lat,
        expireDate
      }
      await Session.create(sessionData)

      return { accessToken, refreshToken }
    }

    static async refreshTokens (originalRefreshToken, sessionUserData, ip, deviceInfo) {
      const { accessToken, refreshToken, expireDate } = await this.generateTokens(sessionUserData)
      const { id: userId } = sessionUserData
      const { locationCoordinates, locationRadius, country, city } = await this.getGeoData(ip)
      const [lng, lat] = locationCoordinates
      const sessionData = {
        userId,
        refreshToken,
        deviceInfo,
        locationRadius,
        country,
        city,
        ip,
        lat,
        lng,
        expireDate
      }
      const session = await Session.findOne({
        attributes: ['id', 'deletedAt', 'expireDate'],
        where: {
          userId,
          refreshTokenHash: createHash('sha256').update(originalRefreshToken).digest('hex')
        }
      })
      if (session.deletedAt) {
        throw new Error('closedSession')
      }
      const expireDateJsDate = new Date(session.expireDate)
      const currentDate = new Date()
      if (expireDateJsDate.getTime() < currentDate.getTime()) {
        throw new Error('expiredSession')
      }
      await session.update(sessionData)
      return { accessToken, refreshToken }
    }

    static async generateTokens (sessionUserData) {
      const { email: userEmail, id: userId } = sessionUserData
      const sign = promisify(jwt.sign)
      const secret = process.env.JWT_TOKEN ? process.env.JWT_TOKEN : 'secret'
      const accessToken = await sign({ jty: 'AT', sessionUserData }, secret, {
        expiresIn: '1h',
        subject: userEmail
      })

      const refreshTokenExpSeconds = 60 * (24 * 3600) // days + (hours * seconds)

      const refreshToken = await sign({ jty: 'RT', userId }, secret, {
        expiresIn: refreshTokenExpSeconds,
        subject: userEmail
      })

      const expireDate = new Date(Date.now() + refreshTokenExpSeconds * 1000)

      return {
        accessToken,
        refreshToken,
        expireDate
      }
    }

    static async closeSession (userId, refreshToken) {
      return await Session.update({
        deletedAt: Date.now()
      }, {
        where: {
          userId,
          refreshTokenHash: createHash('sha256').update(refreshToken).digest('hex')
        }
      })
    }
  }

  Session.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { table: 'user', field: 'id' }
      },
      refreshToken: {
        type: DataTypes.VIRTUAL,
        set: function (val) {
          this.setDataValue('refreshToken', val)
          const refreshTokenHash = createHash('sha256').update(val).digest('hex')
          this.setDataValue('refreshTokenHash', refreshTokenHash)
        }
      },
      refreshTokenHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deviceInfo: {
        type: DataTypes.STRING
      },
      lat: {
        type: DataTypes.FLOAT
      },
      lng: {
        type: DataTypes.FLOAT
      },
      locationRadius: {
        type: DataTypes.INTEGER
      },
      country: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      ip: {
        type: DataTypes.STRING
      },
      expireDate: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Session'
    })
  return Session
}
