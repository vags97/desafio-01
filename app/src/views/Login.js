import React, { useState } from 'react'
import api from './../setup/api'
import { useDispatch } from 'react-redux'
import { setTokens } from '../store/features/userSlice'
import { useNavigate } from 'react-router-dom'

const MyEventContext = React.createContext(() => {})

function getExpTimeString (exp) {
  const time = new Date(exp * 1000)
  const now = new Date()
  const msToExp = (time - now)
  const hours = Math.floor(msToExp / 1000 / 60 / 60)
  const minutes = Math.floor((msToExp / 1000 / 60 / 60 - hours) * 60)
  const seconds = Math.floor(((msToExp / 1000 / 60 / 60 - hours) * 60 - minutes) * 60)
  return `${hours} H, ${minutes} M, ${seconds} S`
}

export default function Login () {
  const [exp, setExp] = useState(0)
  const [isLogged, setIsLogged] = useState(0)
  const navigate = useNavigate()
  function handleLogin (exp) {
    setExp(exp)
    setIsLogged(true)
  }
  if (isLogged) {
    let expString = getExpTimeString(exp)
    const intervalHandle = setInterval(() => {
      expString = getExpTimeString(exp)
    }, 1000)
    setTimeout(() => {
      clearInterval(intervalHandle)
      navigate('/file', { replace: true })
    }, 3000)
    return (
      <div className='grid place-items-center'>
        <h1 className="text-3xl font-bold py-2">Sesión Iniciada</h1>
        <span>Sesión expira en: {expString}</span>
        <span>Redirigiendo a File ...</span>
      </div>
    )
  } else {
    return <LoginCard onLogin={handleLogin}/>
  }
}

function LoginCard ({ onLogin }) {
  const loginEvent = React.useContext(MyEventContext)
  const handleMyEvent = React.useCallback((...args) => {
    // stop propagation if handler returns false
    if (onLogin(...args) !== false) {
      // bubble the event
      loginEvent(...args)
    }
  }, [onLogin])
  const dev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  const [email, setEmail] = useState(dev ? process.env.REACT_APP_DEFAULT_EMAIL : '')
  const [password, setPassword] = useState(dev ? process.env.REACT_APP_DEFAULT_PASSWORD : '')
  const dispatch = useDispatch()
  function handleSubmit (e) {
    e.preventDefault()
    api.post('/login', {
      email,
      password
    })
      .then(({ data }) => {
        const { tokens } = data
        const { accessToken } = tokens
        const { exp } = JSON.parse(window.atob(accessToken.split('.')[1]))
        api.interceptors.request.use(function (config) {
          config.headers.Authorization = `Bearer ${accessToken}`
          return config
        }, function (error) {
          return Promise.reject(error)
        })
        dispatch(setTokens(tokens))
        handleMyEvent(exp)
      })
  }
  return <div className='grid place-items-center'>
    <h1 className="text-3xl font-bold py-2">Iniciar Sesión</h1>
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required=""/>
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Contraseña</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
        </div>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar Sesión</button>
      </form>
    </div>
  </div>
}
