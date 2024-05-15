import { revalidate } from '@/action/revalidatePath';
import { getSingleData } from '@/controller/init'
import dynamic from 'next/dynamic';
import React from 'react'

const Editor = dynamic(() => import("@/components/Input/NoteEditor"), { ssr: false });

const Page = async ({params}) => {
  const noteId = params.id;
  const notesData = await getSingleData("notes", noteId);

  return (
      <Editor revalidate={revalidate} noteTitle={notesData?.title} content={notesData?.content} noteId={noteId}/>
  )
}

export default Page