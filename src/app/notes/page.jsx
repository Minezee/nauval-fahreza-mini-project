'use client'
import { db } from "@/firebase/init";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Markdown from "react-markdown";

const Notes = () => {
  const [filter, setFilter] = useState("All")
  const [notesData, setNotesData] = useState(null)

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

  useEffect(() => {
    getPost()
  },[])

  return (
    <div className="">
      <div className="flex items-center justify-between">
        {/* Filters */}
        <div className="flex gap-2 i">
          {["All", "Projects", "Business", "Personal"].map(data => (
            <button
              onClick={() => setFilter(data)}
              className={`${filter == data && "bg-primary text-white"} px-5 py-2 rounded-lg`}
            >
              {data}
            </button>
          ))}
        </div>
        <Link href={"/notes/create"} className="flex flex-row gap-3 items-center text-primary">
          <IoIosAddCircleOutline className="text-3xl" />
          <span>Add new note</span>
        </Link>
      </div>
      {/* Menu */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {notesData?.map(notes => (
          <div key={notes.createdAt} className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg px-9 py-6">
            <span className="text-sm text-gray-500">{notes.createdAt}</span>
            <div className="line-clamp-[8] note-card">
              <h2 className="my-3 font-semibold text-2xl">{notes.title}</h2>
              <Markdown>{notes.content}</Markdown>
            </div>
          </div>
        ))}
      </div>
      <div>
      </div>
    </div>
  );
}

export default Notes