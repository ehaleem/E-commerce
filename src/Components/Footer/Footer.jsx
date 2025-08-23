import React from 'react'

export default function Footer() {
  return <>
    <div className=" bg-gray-100 w-full p-1">
      <div className='w-[80%] m-auto'>
        <div className='text-left py-4'>
          <h2 className='text-2xl font-bold text-gray-800'>Get The FreshCart App</h2>
          <p className='mt-2 text-gray-700'>We Well Send You a Link</p>
        </div>
        <div className="flex items-center my-2">
          <input className='w-3/4  me-4  p-2 rounded-md focus:outline-none' type="text" placeholder='Enter Your Email' />
          <button className='btn'>Share App Link</button>
        </div>
      </div>
    </div>

  </>

}
