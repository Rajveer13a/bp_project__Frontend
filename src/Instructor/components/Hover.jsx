import React, { useState } from 'react'

function Hover({children ,title,className, contentClass}) {

    const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
       <div onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} className=' h-full px-6 cursor-pointer  '>

        {title}      
     
    </div>

    <ul onMouseEnter={()=>(open && setOpen(true))} onMouseLeave={()=>setOpen(false)}  className={`w-[260px] min-w-min border-[2px]  absolute -right-1 z-10 top-[60px] bg-white text-[15px] ${!open ? "opacity-0 pointer-events-none" : ""} duration-300 ${contentClass}` }>
            {children}
        </ul>


    </div>
  )
}

export default Hover
