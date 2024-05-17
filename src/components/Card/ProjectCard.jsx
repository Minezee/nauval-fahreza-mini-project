'use client'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Priority from '../Icon/Priority'
import Tags from '../Icon/Tags'

const ProjectCard = ({ data, index, columnIcon }) => {
  return (
    <Draggable draggableId={String(data.id)} key={String(data.id)} index={index}>
      {(provided) => (
        <div
          onClick={() => { console.log(index) }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='bg-secondary p-4 rounded-lg flex flex-col mb-3 gap-4 hover:shadow-[0_1px_1px_rgba(192,_132,_252,_0.5)]'
        >
          <div className='flex flex-row gap-1'>
            {columnIcon}
            <h2 className='flex-1 text-sm'>{data.name}</h2>
          </div>
          <div className='flex flex-row gap-[6px]'>
            <div className='bg-tertiary px-[3px] py-[3px] border border-gray-400 rounded-md'>
              <Priority priority={data.priority} />
            </div>
            <Tags name={"Project"} color={"bg-red-400"} />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default ProjectCard