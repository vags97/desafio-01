import api from './../setup/api'
import { useState, useEffect } from 'react'

export default function Credits () {
  const [developers, setDevelopers] = useState([])
  useEffect(() => {
    async function fetchData () {
      try {
        const res = await api.get('/credits')
        setDevelopers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return <div className='grid place-items-center'>
    <h2 className="text-3xl font-bold">Credits</h2>
    <table className="table-auto">
      <thead>
        <tr>
          <th className="font-bold p-2 border-b text-left">
            Nombre
          </th>
          <th className="font-bold p-2 border-b text-left">
            Apellido
          </th>
          <th className="font-bold p-2 border-b text-left">
            Email
          </th>
          <th className="font-bold p-2 border-b text-left">
            Telefono
          </th>
          <th className="font-bold p-2 border-b text-left">
            Linkedin
          </th>
          <th className="font-bold p-2 border-b text-left">
            Github
          </th>
        </tr>
      </thead>
      <tbody>
        { developers.map((developer) => {
          return <tr key={developer.id}>
            <td className="p-2 border-b text-left">
              {developer.firstName}
            </td>
            <td className="p-2 border-b text-left">
              {developer.lastName}
            </td>
            <td className="p-2 border-b text-left">
              {developer.email}
            </td>
            <td className="p-2 border-b text-left">
              {developer.phone}
            </td>
            <td className="p-2 border-b text-left text-blue-600 dark:text-blue-500 hover:underline">
              <a href={developer.linkedin} target="_blank" rel="noreferrer">Linkedin</a>
            </td>
            <td className="p-2 border-b text-left text-blue-600 dark:text-blue-500 hover:underline">
              <a href={developer.github} target="_blank" rel="noreferrer">Github</a>
            </td>
          </tr>
        }) }
      </tbody>
    </table>
  </div>
}
