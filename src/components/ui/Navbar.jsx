import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'

const Navbar = () => {
  return (
    <div className='w-full bg-white px-10 py-5 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
      <div>Search</div>
      <div className='flex items-center gap-4 text-lg'>
        <div className='h-10 w-10 bg-gray-400 rounded-full'></div>
        <span>Hello, Mineze</span>
        <IoMdNotificationsOutline className='text-3xl' />
      </div>
    </div>
  )
}

export default Navbar