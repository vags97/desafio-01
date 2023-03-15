import api from './../setup/api'
import React, { useState, useEffect } from 'react'

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
  return <div>
    <h2>Credits</h2>
    <table>
      <thead>
        <tr>
          <th>
            Nombre
          </th>
          <th>
            Apellido
          </th>
          <th>
            Email
          </th>
          <th>
            Telefono
          </th>
          <th>
            Linkedin
          </th>
          <th>
            Github
          </th>
        </tr>
      </thead>
      <tbody>
        { developers.map((developer) => {
          return <tr key="{developer.id}">
            <td>
              {developer.firstName}
            </td>
            <td>
              {developer.lastName}
            </td>
            <td>
              {developer.email}
            </td>
            <td>
              {developer.phone}
            </td>
            <td>
              <a href={developer.linkedin} target="_blank" rel="noreferrer">Linkedin</a>
            </td>
            <td>
              <a href={developer.github} target="_blank" rel="noreferrer">Github</a>
            </td>
          </tr>
        }) }
      </tbody>
    </table>
  </div>
}
