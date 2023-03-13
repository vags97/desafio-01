import React from "react"
import { Routes, Route } from "react-router-dom";
import Credits from "../views/Credits";



function index () {
    return (
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/file' element={<File/>} />
          <Route path="/credits" element={<Credits/>}/>
          
        </Routes>
    )
}

function Home() {
  return <h2>Home</h2>;
}



function File() {
  return <h2>File</h2>;
}

export default index;