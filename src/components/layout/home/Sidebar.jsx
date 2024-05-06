'use client'
import React from 'react'
import { nav_item } from '@/utils/constants/data'
import { HiPlus } from "react-icons/hi2";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {
  const path = usePathname();

  return (
    <nav className='bg-primary w-[250px] text-white'>
      <div className='bg-secondary text-2xl py-6 flex gap-1 items-center justify-center'>
        <h1 className='font-extralight text-2xl italic'>Memoiré</h1>
        <div className='w-2 h-2 bg-white rounded-full'></div>
      </div>
      <div className='px-8 py-12 flex flex-col gap-10'>
        <div className='text-lg flex flex-col gap-10 relative'>
          {nav_item.map(nav => (
            <Link key={nav.name} href={nav.url} className={`grid grid-cols-3 items-center ${nav.url === path && 'nav-active'}`}>
              <nav.icon size={nav.size} />
              <div>{nav.name}</div>
            </Link>
          ))}
        </div>
        <div className='bg-gray-800/20 h-px w-full'></div>
        <div className='flex flex-col gap-4 text-lg'>
          <div className='flex gap-5 items-center'>
            <div className='bg-yellow-400 h-3 w-3 rounded-full'></div>
            <span>Projects</span>
          </div>
          <div className='flex gap-5 items-center'>
            <div className='bg-orange-400 h-3 w-3 rounded-full'></div>
            <span>Business</span>
          </div>
          <div className='flex gap-5 items-center'>
            <div className='bg-blue-400 h-3 w-3 rounded-full'></div>
            <span>Personal</span>
          </div>
          <div className='flex gap-3 items-center font-extralight'>
            <HiPlus size={20} />
            <span>Add New</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar