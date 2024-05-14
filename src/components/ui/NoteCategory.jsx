'use client'
import React, { useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi2'
import { IoIosClose } from 'react-icons/io';
import { db } from '@/firebase/init';
import { collection, addDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

const NoteCategory = ({revalidate, categoryData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const colorClasses = [
    "bg-red-400", "bg-green-400", "bg-blue-400", "bg-yellow-400", "bg-indigo-400", 
    "bg-purple-400", "bg-pink-400"];

  async function handleAddCategory(e) {
    e.preventDefault();
    const categoryId = categoryData.length + 1;
    const colorIndex = (categoryId - 1) % colorClasses.length;
    const color = colorClasses[colorIndex];
    
    const ref = collection(db, "category");
    await addDoc(ref, {
      id: categoryId,
      name: name,
      color: color,
      createdAt: dayjs().format(),
    }).then((res) => {
      setName("");
      setIsOpen(false);
      revalidate("/notes")
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='flex flex-col gap-4 text-lg'>
      {categoryData.map(ctg => (
        <div key={ctg.id} className='flex gap-5 items-center'>
          <div className={`${ctg.color} h-3 w-3 rounded-full`}></div>
          <span>{ctg.name}</span>
        </div>
      ))}
      {isOpen ?
        <form onSubmit={handleAddCategory} className='w-full flex flex-col gap-4'>
          <div className='flex flex-row w-full items-center'>
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={14} type="text" className='bg-transparent border-b focus:outline-none pr-2 pb-1 font-light flex-1 w-1/2' />
            <button onClick={() => setIsOpen(false)} className='p-1 rounded-full hover:bg-secondary'>
              <IoIosClose size={24} className='text-white' />
            </button>
          </div>
          <button type="submit" className='flex gap-3 items-center justify-center w-full font-extralight bg-secondary rounded-lg py-2'>
            Add Category
          </button>
        </form>
        :
        <button onClick={() => setIsOpen(true)} className='flex gap-3 items-center font-extralight'>
          <HiPlus size={20} />
          <span>Add New</span>
        </button>
      }
    </div>
  )
}

export default NoteCategory