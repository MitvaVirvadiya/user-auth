import React from 'react'

function Logout({
    className = ""
}) {

    const logout = async () => {
        try {
           
            const response = await fetch('http://localhost:1337/api/user/logout')
            console.log(response);
            const data = await response.json()
            console.log(data);

            if(data.status === 200){
                console.log("user Logged out successfully");
                window.location.href = '/login'
            }
        } catch (error) {
            console.error("Logout error: ", error);
        }
    }

  return (
    <div>
        <button onClick={logout} className={`bg-sky-100 text-sky-700 hover:bg-sky-700 transition hover:text-sky-100 font-semibold py-2 px-4 rounded-md ${className}`}>Logout</button>
    </div>
  )
}

export default Logout