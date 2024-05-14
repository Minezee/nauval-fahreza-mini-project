import { getTimeAgo } from '@/utils/helpers/getTimeAgo'
import Link from 'next/link'
import React from 'react'
import Markdown from 'react-markdown'

const NoteCard = ({data}) => {
  return (
    <Link href={`/notes/${data.id}`} key={data.uid} className="rounded-lg px-6 py-3 min-h-[360px] text-white/80 bg-secondary">
      <span className="text-sm text-gray-500">{getTimeAgo(data.createdAt)}</span>
      <div className="note-card line-clamp-[8]">
        <div className="flex flex-row items-center gap-1">
          <div className={`${data.color} min-h-2 min-w-2 rounded-full`}></div>
          <h2 className="my-3 font-semibold text-2xl flex">
            {data.title}
          </h2>
        </div>
        <Markdown>{data.content}</Markdown>
      </div>
    </Link>
  )
}

export default NoteCard