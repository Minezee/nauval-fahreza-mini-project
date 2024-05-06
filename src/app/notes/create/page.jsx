import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Input/NoteEditor"), { ssr: false });

const CreateNotes = () => {

  return (
    // <div className="min-h-[calc(100vh-200px)] relative">
    <>
      <Editor />
      {/* <button className="fixed right-10 bottom-5 bg-primary rounded-full px-6 py-3 text-white font-semibold">Submit</button> */}
    </>
  )
}

export default CreateNotes