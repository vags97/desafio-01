async function getHomeInfo (req, res, next) {
  const messages = {
    welcome: 'Bienvenid@!',
    stack: 'Esta web ha sido creada utilizando Reactjs, Express (Nodejs) y sqlite',
    details: 'El objetivo de esta herramienta es generar un análisis sencillo a partir de un archivo csv de registros.',
    steps: 'Dirigase a <a href="/file">archivo</a>, y suba un archivo de extensión csv para comenzar'
  }
  res.status(200).json(messages)
}

module.exports = { getHomeInfo }
