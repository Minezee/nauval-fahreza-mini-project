"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase/init";
import { useRouter } from 'next/navigation';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addData } from "@/controller/init";
import SelectCategory from "../Popups/SelectCategory";

export default function NoteEditor({ revalidate, noteTitle, content, noteId }) {
  const editor = useCreateBlockNote();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(noteTitle ?? "");
  const [selectedCtg, setSelectedCtg] = useState('');
  const router = useRouter()
  const [category, setCategory] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    const ref = collection(db, 'category')
    const unsub = onSnapshot(ref, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setCategory(items);
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(content);
      const editorDoc = editor.document ?? null;
      if (editorDoc) {
        editor.replaceBlocks(editorDoc, blocks);
      }
    }
    if (content) {
      loadInitialHTML();
    }
  }, [editor]);

  async function generateContentFromAI() {
    setIsLoading(true);
    editor.replaceBlocks(editor.document, "Generate AI Content...")
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`${title}`);
    const response = result.response;
    const text = await response.text();
    const blocks = await editor.tryParseMarkdownToBlocks(text);
    editor.replaceBlocks(editor.document, blocks);
    setIsLoading(false)
  }

  async function handleSubmit() {
    await editor.blocksToMarkdownLossy().then((markdown) => {
      setIsSubmitting(true)
      addData("notes",
        {
          title: title,
          content: markdown,
          category: selectedCtg,
        },
        () => {
          revalidate('/notes');
          router.push('/notes');
          setIsSubmitting(false)
        },
        (err) => {
          console.log(err)
          setIsSubmitting(false)
        },
      )
    });
  }

  async function handleUpdate() {
    await editor.blocksToMarkdownLossy().then((markdown) => {
      setIsSubmitting(true)
      const ref = doc(db, "notes", noteId);
      updateDoc(ref, {
        title: title,
        content: markdown,
      }).then(() => {
        revalidate('/notes');
        router.push('/notes');
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setIsSubmitting(false)
      })
    });
  }

  async function handleDelete() {
    try {
      const docRef = doc(db, "notes", noteId);
      await deleteDoc(docRef);
      revalidate('/notes');
      router.push('/notes');
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  return (
    <>
      {isOpen &&
        <SelectCategory
          category={category}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          selectedCtg={selectedCtg}
          setIsOpen={setIsOpen}
          setSelectedCtg={setSelectedCtg} />
      }
      <div className="min-h-[calc(100vh-200px)] relative h-full px-10 py-12 bg-secondary">
        <div className='max-w-4xl container mx-auto flex flex-col min-h-full'>
          <input maxLength={24} onChange={(e) => setTitle(e.target.value)} value={title} type="text" className='w-full font-extrabold mx-12 rounded-xl py-2 text-5xl focus:outline-none bg-transparent text-white' placeholder='Untitled' />
          <BlockNoteView className="z-0" editable={!isOpen} editor={editor} style={{ backgroundColor: "transparent" }} />
        </div>
        <div className="fixed right-10 bottom-5 flex flex-row items-center gap-4">
          {noteId ?
            <button onClick={handleDelete} className={`rounded-full px-6 py-3 text-red-400 font-semibold bg-primary`}>{isLoading ? "Loading.." : "Delete"}</button>
            :
            <button onClick={generateContentFromAI} className={`rounded-full px-6 py-3 text-white font-semibold bg-[#3F3F3F]`}>{isLoading ? "Loading.." : "Generate AI"}</button>}
          <button disabled={!title} onClick={() => { noteId ? handleUpdate() : setIsOpen(true) }} className={`${title ? "bg-primary" : "bg-gray-400"} rounded-full px-6 py-3 text-green-400 font-semibold`}>{content ? (isSubmitting ? 'Loading..' : 'Update') : "Done"}</button>
        </div>
      </div>
    </>
  );
}