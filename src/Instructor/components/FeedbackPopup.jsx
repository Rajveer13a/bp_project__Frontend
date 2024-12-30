import React, { useState } from 'react'
import { IoMdAlert } from 'react-icons/io'
import { TbAlertSquareFilled } from "react-icons/tb";

function FeedbackPopup({data}) {

    // console.log(data[name]);

    const [enable , setEnable] = useState(false);
    

  return (
    <div onMouseLeave={()=>setEnable(false)}  className='relative z-20'>
      <TbAlertSquareFilled onMouseEnter={()=>setEnable(true)}  className='size-7 fill-red-700 z-10  relative cursor-pointer' />
      <div className={`border border-black border-dotted p-3 bg-sky-100 absolute w-72 top-3 rounded-sm -right-[275px] ${!enable && "opacity-0 " } duration-700 transition-all animate-in -z-0 cursor-default overflow-y-scroll max-h-48`}>
        {data}
      </div>
    </div>
  )
}

export default FeedbackPopup
