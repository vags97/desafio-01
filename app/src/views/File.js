
import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from './../setup/api'

export default function File () {
  const [file, setFile] = useState()
  const [events, setEvents] = useState([])
  const refFileInput = useRef()

  function handleFileChange (e) {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    api.post('/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(({ data }) => {
        const { id } = data
        setFile()
        refFileInput.current.value = ''
        navigate(`/event/${id}`, { replace: true })
      })
      .catch((err) => console.error(err))
  }
  const navigate = useNavigate()
  const refreshToken = useSelector(state => state.user.tokens.refreshToken)
  useEffect(() => {
    if (!refreshToken) {
      navigate('/login-required', { replace: true })
    } else {
      api.get('/file')
        .then(({ data }) => {
          setEvents(data.events)
        })
    }
  }, [])
  return <div className='grid place-items-center'>
    <h2 className="text-3xl font-bold">Análisis de CSV</h2>
    <p className='pt-4'>
      Suba el archivo csv y obtenga la cantidad de registrados según país ordenados de mayor a menor.
    </p>
    <form className="space-y-6 pt-6" onSubmit={handleSubmit}>
      <p>Asegúrese de que el archivo contenga una columna llamada &quot;país&quot;</p>
      <input type="file" onChange={handleFileChange} ref={refFileInput}/>

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Subir Documento</button>
    </form>
    <h2 className="text-3xl font-bold pt-5">Eventos</h2>
    <table className="table-auto">
      <thead>
        <tr>
          <th className="font-bold p-2 border-b text-left">
            Nombre Archivo
          </th>
          <th className="font-bold p-2 border-b text-left">
            Fecha de Creación
          </th>
          <th className="font-bold p-2 border-b text-left">
            Ver información
          </th>
        </tr>
      </thead>
      <tbody>
        { events.map((event) => {
          const createdAt = new Date(event.createdAt)
          const createdAtString = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`
          return <tr key={event.id}>
            <td className="p-2 border-b text-left">
              {event.fileName}
            </td>
            <td className="p-2 border-b text-left">
              {createdAtString}
            </td>
            <td className="p-2 border-b text-left">
              <Link
                to={`/event/${event.id}`}
                className="-mx-3 block rounded-lg py-2.5  text-blue-600 px-3 text-base font-semibold leading-7 hover:bg-gray-50"
              >
                Ver Información
              </Link>
            </td>
          </tr>
        }) }
      </tbody>
    </table>
  </div>
}
