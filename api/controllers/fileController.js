const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { Events } = require('../models')
const { parse } = require('csv-parse')

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
      const event = await Events.create({ path: filePath })
      console.log(event)
      res.status(200).json({
        msg: 'Archivo cargado correctamente',
        id: event.id
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

async function getEventInfo (req, res) {
  const id = req.params.id
  const eventDb = await Events.findOne({
    attributes: [
      'path',
      'createdAt'
    ],
    where: { id }
  })
  let rowIndex = 0
  let countryRowIndex = null
  const countries = []
  fs.createReadStream(eventDb.path)
    .pipe(parse({ delimiter: ',', from_line: 1 }))
    .on('data', (row) => {
      if (rowIndex === 0) {
        countryRowIndex = row.findIndex((col) => col === 'pais')
      } else {
        const rowCountry = row[countryRowIndex]
        const country = countries.find((countryData) => countryData.country === rowCountry)
        if (country) {
          country.assistants += 1
        } else {
          countries.push({
            country: rowCountry,
            assistants: 1
          })
        }
      }
      rowIndex++
    })
    .on('end', function () {
      const event = {
        fileName: path.basename(eventDb.path),
        createdAt: eventDb.createdAt,
        assistantsPerCountry: countries.sort((a, b) => b.assistants - a.assistants)
      }
      return res.status(200).json({
        msg: 'Evento obtenido correctamente',
        event
      })
    }).on('error', function (err) {
      console.log(err)
      res.status(500).json({
        msg: 'Error del servidor',
        err
      })
    })
}

module.exports = { generateFileAnalysis, getEvents, getEventInfo }
