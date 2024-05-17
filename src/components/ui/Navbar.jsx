import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'

const Navbar = () => {
  return (
    <div className='w-full bg-primary px-10 py-5 flex justify-end items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white'>
      <div className='flex items-center gap-4 text-lg'>
        <span>Hello, User</span>
        <div className='h-10 w-10 bg-gray-400 rounded-full'></div>
        {/* <IoMdNotificationsOutline className='text-3xl' /> */}
      </div>
    </div>
  )
}

export default Navbar