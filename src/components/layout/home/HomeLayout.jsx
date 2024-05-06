import React from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from './Sidebar';

const HomeLayout = ({ children }) => {
  return (
    <div className='h-screen flex'>
      <Sidebar />
      <div className='flex flex-col flex-1 h-screen'>
        <Navbar />
        <main className='px-10 py-12 overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default HomeLayout