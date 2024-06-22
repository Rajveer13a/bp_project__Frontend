import React, { useState } from 'react'
import { FaRegBell } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import Hover from './Hover'

function Notification() {

    const [active , setActive] = useState(0);

  return (
    <Hover className={""} contentClass={"w-[340px]"} title={<FaRegBell className='size-5 mt-[12px]' />}>
        <div className='flex justify-between p-5 font-semibold'>
            <h1 className='font-bold text-xl'>Notification</h1>
            <Link to={"/settings"}><h4 className='text-blue-500 '>Settings</h4></Link>
        </div>

        <div>

            <div className=' font-semibold flex pb-2 text-center'>
                <h3 onClick={()=> setActive(0)} className={`relative w-[50%]  ${active ===0 ?"current " : "cursor-pointer" }`}>Instuctor</h3>
                <h3 onClick={()=> setActive(1)} className={`relative w-[50%]  ${active ===1 ? "current" : "cursor-pointer" }`} > Student</h3>
            </div>
            <hr className=' border-[1.5px]'/>

            <div className='text-center py-4'>
                
            No notifications.
            </div>

        </div>


    </Hover>
  )
}

export default Notification
