"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import dayjs from "dayjs";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase/init";
import { useRouter } from 'next/navigation';

export default function NoteEditor() {
  const editor = useCreateBlockNote();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notesData, setNotesData] = useState(null)
  const router = useRouter()
  
  async function getPost() {
    const ref = collection(db, "notes");
    const collectedDocs = await getDocs(ref);

    let data = [];
    for (let x of collectedDocs.docs) {
      if (!x.exists()) return setNotesData([]);
      data.push(x?.data());
      console.log(data)
    }
    setNotesData(data);
  }

  async function handleSubmit() {
    await editor.blocksToMarkdownLossy().then((markdown) => {
      const ref = collection(db, "notes");
      console.log(markdown)
      addDoc(ref, {
        title: title,
        content: markdown,
        createdAt: dayjs().format(),
      }).then((res) => {
        getPost();
        router.push('/notes'); 
      }).catch((err) => {
        console.log("error")
      })
    });
  }


  return (
    <div className="min-h-[calc(100vh-200px)] relative">
      <div className='max-w-4xl container mx-auto flex flex-col'>
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className='w-full font-bold mx-12 rounded-xl py-2 text-5xl focus:outline-none bg-transparent' placeholder='Untitled' />
        <BlockNoteView editor={editor} theme={"light"} />
      </div>
      <button onClick={handleSubmit} className="fixed right-10 bottom-5 bg-primary rounded-full px-6 py-3 text-white font-semibold">Submit</button>
    </div>
  );
}