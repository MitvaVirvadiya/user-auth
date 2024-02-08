import React, { useEffect, useState } from 'react'
import Logout from './Logout'

function Home() {

  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@localhost",
  })

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('http://localhost:1337/api/user/get-user')
  
      const data = await response.json()
      if(!data.user){
        console.error("User info failed to fetch"); 
      } else {
        setUser(data.user)
      }
    }

    getUser()
  }, [])

  return (
    <div className='w-full h-screen bg-zinc-800'>
        <h2 className='text-4xl font-semibold mb-2 text-center text-sky-100'>Home</h2>
        <p className='text-lg text-center text-sky-100'>Welcome {user.name}</p>
        <Logout className='absolute top-2 right-4'/>
    </div>
  )
}

export default Home