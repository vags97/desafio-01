import api from './../setup/api';
import React, {useState, useEffect} from "react"

export default function Home() {
    const [messages, setMessages] = useState([]);
    useEffect( () => { 
      async function fetchData() {
          try {
              const res = await api.get('/home'); 
              setMessages(res.data);
          } catch (err) {
              console.log(err);
          }
      }
      fetchData();
  }, []);
  return <div>
    <h1>
        {messages.welcome}
    </h1>
    <h3>
        {messages.stack}
    </h3>
    <h3>
        {messages.details}
    </h3>
    <h3>
        {messages.steps}
    </h3>
  </div>
  }