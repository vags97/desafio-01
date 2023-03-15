import api from '../setup/api'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Event () {
  const { id } = useParams()
  const [event, setEvent] = useState({
    fileName: '...',
    assistantsPerCountry: [],
    createdAt: ''
  })
  useEffect(() => {
    async function fetchData () {
      try {
        const res = await api.get(`event/${id}`)
        setEvent(res.data.event)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  const createdAt = new Date(event.createdAt)
  const createdAtString = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`
  return <div className='grid place-items-center'>
    <h1 className="text-3xl font-bold">Evento</h1>
    <h2>
      <strong>
        Nombre Archivo del Evento:&nbsp;
      </strong>
      {event.fileName}
    </h2>
    <h2>
      <strong>
        Fecha de Creación:&nbsp;
      </strong>
      {createdAtString}
    </h2>
    <h2 className='pt-10'>
      <strong>
        Asistentes Por País (Ordenados de Mayor a Menor)
      </strong>
    </h2>
    <table className="table-auto">
      <thead>
        <tr>
          <th className="font-bold p-2 border-b text-left">
            País
          </th>
          <th className="font-bold p-2 border-b text-left">
            Asistentes
          </th>
        </tr>
      </thead>
      <tbody>
        { event.assistantsPerCountry.map((assistantsCountry) => {
          return <tr key={event.country}>
            <td className="p-2 border-b text-left">
              {assistantsCountry.country}
            </td>
            <td className="p-2 border-b text-left">
              {assistantsCountry.assistants}
            </td>
          </tr>
        }) }
      </tbody>
    </table>
  </div>
}
