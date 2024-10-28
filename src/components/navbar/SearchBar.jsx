import React, { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'

function SearchBar() {

    const [input, setInput] = useState("");
    console.log(input);
    
  return (
    <div className='relative w-[40%] px-3 text-sm '>
        <input onChange={(e)=>setInput(e.target.value)} placeholder='Search for anything' className='outline-none border border-black rounded-3xl pl-14 py-[12px] w-full placeholder:text-slate-500 placeholder:text-sm pr-8' type="text" />
        <MdOutlineSearch className={`absolute size-6 top-[11px] left-8  ${input ? "fill-black" : "fill-slate-400"} `} />
    </div>
  )
}

export default SearchBar
