import React from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from './Sidebar';
import { getData } from '@/hooks/init';
import { revalidate } from '@/action/revalidatePath';

const HomeLayout = async ({ children }) => {
  const categoryData = await getData("category", "asc")

  return (
    <div className='h-screen flex text-black'>
      <Sidebar revalidate={revalidate} categoryData={categoryData}/>
      <div className='flex flex-col flex-1 h-screen'>
        <Navbar />
        <main className='overflow-y-auto flex-1 bg-tertiary text-white'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default HomeLayout