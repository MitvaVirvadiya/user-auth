import { useState } from 'react'
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Login from './components/Login'
import Home from './components/Home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
