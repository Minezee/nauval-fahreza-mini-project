import React from 'react'

const SelectCategory = ({category, setSelectedCtg, selectedCtg, setIsOpen, handleSubmit, isSubmitting}) => {
  return (
    <div className="h-screen w-screen fixed left-0 top-0 bg-black/50 z-[999] flex items-center justify-center">
      <div className="relative bg-tertiary w-[600px] h-96 rounded-lg px-4 py-6">
        <h2 className="text-center font-bold text-4xl text-white">Select Note Category</h2>
        <div className="grid grid-cols-4 gap-4 mt-10 max-h-52">
          {category.map(ctg => (
            <button onClick={() => setSelectedCtg(ctg.id)} key={ctg.id} className={`${selectedCtg === ctg.id ? `${ctg.color} text-white` : "hover:bg-gray-600/10 bg-primary"} flex gap-3 items-center justify-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg py-3`}>
              <div className={`${selectedCtg !== ctg.id ? `${ctg.color}` : "bg-white"} h-2 w-2 rounded-full`}></div>
              <span className="font-semibold">{ctg.name}</span>
            </button>
          ))}
        </div>
        <div className="absolute right-5 bottom-5 flex items-center gap-4">
          <button onClick={() => setIsOpen(false)} className="bg-primary rounded-full px-6 py-3 text-red-400 font-semibold">Cancel</button>
          <button onClick={handleSubmit} className="bg-primary rounded-full px-6 py-3 text-green-400 font-semibold">{isSubmitting ? "Loading.." : "Submit"}</button>
        </div>
      </div>
    </div>
  )
}

export default SelectCategory