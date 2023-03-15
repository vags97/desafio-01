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
  return <div>
    <h1 className="text-3xl font-bold underline">
      {messages.welcome}
    </h1>
    <h3>
      {messages.stack}
    </h3>
    <h3>
      {messages.details}
    </h3>
    <h3>{parse(steps)}</h3>
  </div>
}
