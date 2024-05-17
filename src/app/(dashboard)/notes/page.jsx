import NoteCard from "@/components/Card/NoteCard";
import Filter from "@/components/ui/Filter";
import { getData } from "@/controller/init";
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";

const Page = async ({searchParams}) => {
  const noteData = await getData("notes", "desc")
  const categoryData = await getData("category", "asc")
  const selectedCtg = searchParams.category
  let filteredNotes = [...noteData];

  if (selectedCtg) {
    const selectedCategory = categoryData.find(ctg => ctg.name.toLowerCase() === selectedCtg.toLowerCase());
    if (selectedCategory) {
      filteredNotes = noteData.filter(note => note.category === selectedCategory.id);
    }
  }

  const combinedData = filteredNotes.map(note => {
    const matchingCategory = categoryData.find(ctg => ctg.id === note.category);
    const color = matchingCategory ? matchingCategory.color : "default-color";
    return { ...note, color };
  });

  return (
    <div className="px-10 py-12">
      <div className="flex items-center justify-between">
        <Filter categoryData={categoryData}/>
        <Link href={"/notes/create"} className="flex flex-row gap-3 items-center text-white hover:text-green-400">
          <IoIosAddCircleOutline className="text-3xl" />
          <span>Add new note</span>
        </Link>
      </div>

      {/* Menu */}
      <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
        {combinedData?.map(notes => (
          <NoteCard data={notes}/>
        ))}
      </div>
      <div>
      </div>
    </div>
  );
}

export default Page