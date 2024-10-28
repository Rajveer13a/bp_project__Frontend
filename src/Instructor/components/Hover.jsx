import React, { useState } from 'react'

function Hover({children ,title,className, contentClass}) {

    const [open, setOpen] = useState(false);

  return (
    <div onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} className={`relative ${className} `}>
       <div  className=' h-full px-3 cursor-pointer  py-3 '>

        {title}      
     
    </div>

    <div  className={`w-[260px] min-w-min   absolute right-2 z-10 top-[60px]  ${!open ? "opacity-0 pointer-events-none" : ""} duration-300 ${contentClass} ` }>
    <ul  className='bg-white text-[15px] mt-[5px] border-2 shadow-md' >
            {children}
        </ul>
    </div>


    </div>
  )
}

export default Hover
