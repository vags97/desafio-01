import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../views/Home'
import Credits from '../views/Credits'
import File from '../views/File'
import LoginRequired from './../views/LoginRequired'
import Login from './../views/Login'
import Logout from './../views/Logout'
import Event from './../views/Event'

function index () {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/file' element={<File/>} />
      <Route path='/event/:id' element={<Event/>} />
      <Route path="/credits" element={<Credits/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/login-required" element={<LoginRequired/>}/>

    </Routes>
  )
}

export default index
