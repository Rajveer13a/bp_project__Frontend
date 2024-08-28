import { useState } from 'react'

function ContentTypeBox({title,Icon}) {
  
    const [enter, setEnter] = useState(false);


    return (

        <div onMouseEnter={()=>setEnter(true)} className='bg-[#F7F9FA] w-[70px] border border-[#D1D7DC] group wraploopparent overflow-hidden cursor-pointer'>

            <div className=' flex items-center justify-center h-11 group-hover:bg-[#2D2F31]   '>
                
                <Icon className={`size-8 fill-[#D1D7DC] group-hover:fill-white ${enter && "anim-wraploop"} `} /> 

            </div>

            <h1 className='bg-[#D1D7DC] text-xs text-center group-hover:bg-[#2D2F31] group-hover:text-white group relative z-0'>
                {title}
            </h1>

        </div>
    )
}

export default ContentTypeBox
