import api from './../setup/api'
import React, { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

export default function Home () {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    async function fetchData () {
      try {
        const res = await api.get('/')
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  const steps = DOMPurify.sanitize(messages.steps)
  return <div className='grid place-items-center'>
    <h2 className="text-3xl font-bold py-2">Home</h2>
    <h1 className="text-3xl font-bold underline py-2">
      {messages.welcome}
    </h1>
    <h3 className='py-2'>
      {messages.stack}
    </h3>
    <h3 className='py-2'>
      {messages.details}
    </h3>
    <h3>{parse(steps)}</h3>
  </div>
}
