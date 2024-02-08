import React from 'react'

function Input({type, id, value, onChange, label}) {
  return (
    <div className='w-full pl-1 pr-4 py-1'>
        <label className='block mb-1 text-md font-semibold' htmlFor={id}>{label}</label>
        <input 
            type={type}
            value={value}
            id={id}
            onChange={onChange}
            placeholder=' '
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500 text-sky-950' 
        />
    </div>
  )
}

export default Input