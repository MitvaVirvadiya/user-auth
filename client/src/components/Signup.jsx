import React, { useState } from 'react'
import Input from './Input'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {
    try {
      
      const response = await fetch('http://localhost:1337/api/user/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          username: name,
          password
        })
      })

      const data = await response.json()

      if(data.status === 200){
        console.log("User created successfully");
        navigate('/login')
      }

    } catch (error) {
      console.error("Registration error: ", error);
    }
  }

  return (
    <div className='w-full h-screen md:bg-zinc-800 bg-[url(https://images.unsplash.com/photo-1597589827703-f4b68eafa0ce?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat flex justify-center items-center'>
        <div className='w-full sm:w-2/3 md:w-1/2 lg:w-1/4 min-h-24 bg-sky-500/70 rounded-md shadow-lg p-6 text-sky-100'>
          <h2 className='text-4xl font-semibold mb-2 text-center'>Sign up</h2>
          <Input id="name" value={name} type="text" onChange={(e) => setName(e.target.value)} label="Username"/>
          <Input id="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} label="Email"/>
          <Input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} label="Password"/>
          <p className='text-sm ml-2 mt-2 font-semibold'>Already have an account?<span className='ml-1 hover:underline cursor-pointer' ><Link to="/login">Login</Link></span></p>
          <button onClick={register} className='bg-sky-100 text-sky-700 hover:bg-sky-700 transition hover:text-sky-100 font-semibold py-2 px-4 rounded-md mt-2 ml-1'>Sign Up</button>
        </div>
    </div>
  )
}

export default Signup