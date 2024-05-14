import dynamic from "next/dynamic";
import { revalidate } from "@/action/revalidatePath";

const Editor = dynamic(() => import("@/components/Input/NoteEditor"), { ssr: false });

const CreateNotes = () => {
  return (
    <Editor revalidate={revalidate} />
  )
}

export default CreateNotes