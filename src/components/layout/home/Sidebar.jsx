'use client'
import React from 'react'
import { nav_item } from '@/utils/constants/data'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import NoteCategory from '@/components/ui/NoteCategory';

const Sidebar = ({revalidate, categoryData}) => {
  const path = usePathname();
  const color = ["text-green-400", "text-red-400", "text-purple-400"]

  return (
    <nav className='bg-primary w-[250px] text-white overflow-y-auto sidebar overflow-x-hidden'>
      <div className='bg-primary text-2xl py-6 flex gap-1 items-center justify-center'>
        <h1 className='font-extralight text-2xl italic text-white'>Memoiré</h1>
        <div className='w-2 h-2 bg-white rounded-full'></div>
      </div>
      <div className='px-8 py-12 flex flex-col gap-10'>
        <div className='text-lg flex flex-col gap-10 relative'>
          {nav_item.map((nav, idx) => (
            <Link key={nav.name} href={nav.url} className={`grid grid-cols-3 items-center hover:${color[idx]} ${nav.url === path && 'nav-active'}`}>
              <nav.icon size={nav.size} />
              <div>{nav.name}</div>
            </Link>
          ))}
        </div>
        <NoteCategory revalidate={revalidate} categoryData={categoryData}/>
      </div>
    </nav>
  )
}

export default Sidebar