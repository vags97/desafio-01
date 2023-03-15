import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
    'Accept-Language': 'es'
  }
})

api.interceptors.request.use(function (config) {
  // TODO: Implementar token sesion
  /*
  const accessToken = sessionStore.accessToken
  if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
    //console.log(config);
    return config
  } else {
    return config
  } */
  return config
}, function (error) {
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response) {
    if (!Object.prototype.hasOwnProperty.call(error.response.data, 'msg')) {
      error.response.data.msg = 'Error en el servidor no identificado'
    }
    if (!Object.prototype.hasOwnProperty.call(error.response.data, 'errors')) {
      error.response.data.errors = [['Error en el servidor no identificado']]
    }
    if (error.response.status === 401) {
      // TODO: implementar cierre de sesion
      /* const sessionStore = useSessionStore()
      sessionStore.destroy() */
    }
  } else if (error.request) {
    error.msg = 'Sin respuesta del servidor'
    error.errors = [['Sin respuesta del servidor']]
  } else {
    error.msg = 'Error del cliente, comuniquese con el administrador'
    error.errors = [['Error del cliente, comuniquese con el administrador']]
  }
  return Promise.reject(error)
})

export default api
