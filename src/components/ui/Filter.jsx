'use client'
import { db } from "@/firebase/init";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const Filter = ({categoryData}) => {
  const [filter, setFilter] = useState("");
  const router = useRouter()

  const handleFilters = (ctgName) => {
    if(ctgName){
      router.push(`/notes?category=${ctgName.toLowerCase()}`)
      setFilter(ctgName)
    } else {
      setFilter("")
      router.push('/notes')
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleFilters()}
        className={`${filter == "" && "bg-secondary"} px-5 py-2 rounded-lg hover:text-red-400`}
      >
        All
      </button>
      {categoryData.map(category => (
        <button
          key={category.id}
          onClick={() => handleFilters(category.name)}
          className={`${filter == category.name && "bg-secondary"} px-5 py-2 rounded-lg hover:text-red-400`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default Filter