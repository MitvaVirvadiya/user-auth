import React, { useState } from 'react'
import Input from './Input'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const signin = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/user/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password
          })
        })

        const data = await response.json()

        if(data.status === 200){
          console.log("User Logged in successfully");
          window.location.href = '/'
        } 

      } catch (error) {
        console.error("Sign in error: ", error);
      }
    }

    return (
      <div className='w-full h-screen md:bg-zinc-800 bg-[url(https://images.unsplash.com/photo-1597589827703-f4b68eafa0ce?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat flex justify-center items-center'>
          <div className='w-full sm:w-2/3 md:w-1/2 lg:w-1/4 min-h-24 bg-sky-500/70 rounded-md shadow-lg p-6 text-sky-100'>
            <h2 className='text-4xl font-semibold mb-2 text-center'>Login</h2>
            <Input id="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} label="Email"/>
            <Input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} label="Password"/>
            <p className='text-sm ml-2 mt-2 font-semibold'>Don't have an account?<span className='ml-1 hover:underline cursor-pointer'><Link to="/signup">Sign up</Link></span></p>
            <button onClick={signin} className='bg-sky-100 text-sky-700 hover:bg-sky-700 transition hover:text-sky-100 font-semibold py-2 px-4 rounded-md mt-2 ml-1'>Login</button>
          </div>
      </div>
    )
}

export default Login