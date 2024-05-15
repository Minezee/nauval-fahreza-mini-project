'use client'
import React, { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import { RiCloseLine } from 'react-icons/ri'
import Priority from '../Icon/Priority'
import { addData } from '@/controller/init'
import { revalidate } from '@/action/revalidatePath'

const PriorityButton = ({ priority, setSelectPrio, setPriority }) => {
  function handleClick() {
    setSelectPrio(false)
    setPriority(priority)
  }

  return (
    <button onClick={handleClick} className='flex px-2 py-2 gap-2 hover:bg-gray-600 w-full'>
      <Priority priority={priority} size={18} />
      {priority === 1 ? 'High' : priority === 2 ? 'Medium' : 'Low'}
    </button>
  )
};

const CreateProject = ({ setIsOpen, column }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(3);
  const [selectPrio, setSelectPrio] = useState(false);

  async function handleSubmitTask(e) {
    e.preventDefault()
    addData("task",
        {
          name: title,
          description: description,
          priority: priority,
          progress: column.progress,
        },
        () => {
          revalidate('/project');
          handleClose()
        },
        (err) => {
          console.log(err)
        },

      )
    }

  function handleClose() {
    setIsOpen(false)
    setTitle("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmitTask} className='fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black/10'>
      <div className='w-[748px] h-[247px] bg-tertiary rounded-lg border border-white/20 p-5 flex flex-col'>
        <div className='flex flex-row items-start justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <div className='px-3 py-2 rounded-lg text-white bg-secondary border border-white/10'>Todo</div>
            <FaChevronRight />
            <span>New task</span>
          </div>
          <button type='button' onClick={handleClose} className='text-xl'>
            <RiCloseLine />
          </button>
        </div>
        <div className='flex flex-col h-full'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className='text-white placeholder:text-gray-400 bg-transparent focus:outline-none py-2 mt-2 text-xl font-semibold'
            placeholder='Task title' />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Add description...'
            className='flex-1 text-lg font-normal bg-transparent h-full focus:outline-none resize-none'>
            asd
          </textarea>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <button type='button' onClick={() => setSelectPrio(!selectPrio)} className='px-2 py-[6px] bg-secondary rounded-md border border-white/10 text-sm flex gap-1 items-center'>
                <Priority priority={priority} size={18} />
                {priority === 1 ? 'High' : priority === 2 ? 'Medium' : 'Low'}
              </button>
              {selectPrio &&
                <div className='absolute mt-1 w-fit left-0 bg-secondary rounded-md border border-white/10'>
                  {[3, 2, 1].map(data => (
                    <PriorityButton
                      key={data}
                      priority={data}
                      setSelectPrio={setSelectPrio}
                      setPriority={setPriority} />
                  ))}
                </div>
              }
            </div>
            <div className='px-2 py-[6px] bg-secondary rounded-md border border-white/10 text-sm flex gap-1 items-center'>
              {column.icon}
              {column.title}
            </div>
          </div>
          <button type='submit' className='px-4 py-2 bg-secondary border font-semibold border-green-400 rounded-lg'>Create Task</button>
        </div>
      </div>
    </form>
  )
}

export default CreateProject