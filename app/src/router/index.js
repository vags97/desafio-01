import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../views/Home'
import Credits from '../views/Credits'

function index () {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/file' element={<File/>} />
      <Route path="/credits" element={<Credits/>}/>

    </Routes>
  )
}

function File () {
  return <h2>File</h2>
}

export default index
