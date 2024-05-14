import React from 'react'

const Tags = ({color, name}) => {
  return (
    <div className='bg-tertiary text-sm px-[3px] py-[3px] border border-gray-400 rounded-md flex flex-row items-center gap-1'>
      <div className={`${color} rounded-full h-[9px] w-[9px]`}></div>
      {name}
    </div>
  )
}

export default Tags