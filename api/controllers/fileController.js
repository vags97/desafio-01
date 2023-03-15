const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { Events } = require('../models')

async function generateFileAnalysis (req, res, next) {
  const file = req.file
  const uuid = crypto.randomUUID()
  const [originalFileName, ext] = file.originalname.split('.')
  const fileName = `${originalFileName}_${uuid}.${ext}`
  const filePath = path.join(__dirname, '../storage/', fileName)
  fs.writeFile(filePath, file.buffer, async (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        msg: 'Error del servidor',
        err
      })
    } else {
      await Events.create({ path: filePath })
      res.status(200).json({
        msg: 'Archivo cargado correctamente'
      })
    }
  })
}

async function getEvents (req, res) {
  let events = await Events.findAll({
    attributes: [
      'id',
      'path',
      'createdAt'
    ],
    order: [['createdAt', 'DESC']]
  })
  events = events.map((event) => ({
    id: event.id,
    fileName: path.basename(event.path),
    createdAt: event.createdAt
  }))
  return res.status(200).json({
    msg: 'Eventos obtenidos correctamente',
    events
  })
}

module.exports = { generateFileAnalysis, getEvents }
