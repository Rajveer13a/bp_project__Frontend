import React, { useState } from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { logout } from '@/Redux/Slices/AuthSlice';

import Hover from './Hover';

function Iprofile({ lists = [
    [{ text: "Students", link: "" }],
    [{ text: "Notifications", link: "" }],
    [{ text: "Account Settings", link: "" }, { text: "Payouts & tax settings", link: "" }],
    [{ text: "Public profile", link: "" }, { text: "Edit profile", link: "/profile" }],
    [{ text: "Help", link: "" }, { text: "Logout", link: ""}]

] }) {

    const dispatch = useDispatch();

    const image = useSelector((state) => state.auth.data?.profileImage?.secure_url)

    const data = useSelector((state) => state.auth?.data)

    const [open, setOpen] = useState(false);

    const onLogout = ()=>{
        dispatch(logout());
    }

    return (
        //     <div className='relative '>

        //     <div onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} className=' h-full px-6 cursor-pointer '>
        //       <img className='rounded-full size-10' src={image} alt="profile_image" />



        //     </div>


        //     <ul onMouseEnter={()=>(open && setOpen(true))} onMouseLeave={()=>setOpen(false)}  className={`w-[260px] border-[2px]  absolute -right-1 z-10 top-[60px] bg-white text-[15px] ${!open ? "opacity-0 " : ""} duration-300` }>

        //         <Link to={"/profile"}>
        //         <li className='flex items-center space-x-2  p-4 border-b-[1px] cursor-pointer group'>

        //         <img className='rounded-full size-16' src={image} alt="profile_image" />
        //         <div>
        //             <h1 className='font-bold text-lg group-hover:text-blue-700'>{data?.username}</h1>
        //             <h1 className='text-sm'>{data?.email}</h1>
        //         </div>

        //         </li>
        //         </Link>

        //         {
        //             lists.map((value)=>{

        //                 const container = <div className='border-b-[1px]'>
        //                     {   
        //                         value.map((innervalue,indx)=>{

        //                             return(
        //                                 <Link key={indx} to={innervalue?.link}>
        //                                 <li className='px-4 py-[11px] hover:text-blue-600 cursor-pointer '>
        //                 {innervalue.text}
        //             </li>
        //                                 </Link>
        //                             )
        //                         })
        //                     }
        //                 </div> 

        //                 return container
        //             })
        //         }

        // <li className='px-4 py-[12px] font-bold text-lg flex items-center justify-between '>
        //                Brainy Business <FaExternalLinkAlt />
        //             </li>



        //       </ul>
        //     </div>
        <Hover title={<img className='rounded-full size-10' src={image} alt="profile_image" />}>

            <Link to={"/profile"}>
                <li className='flex items-center space-x-2  p-4 border-b-[1px] cursor-pointer group'>

                    <img className='rounded-full size-16' src={image} alt="profile_image" />
                    <div>
                        <h1 className='font-bold text-lg group-hover:text-blue-700'>{data?.username}</h1>
                        <h1 className='text-sm'>{data?.email}</h1>
                    </div>

                </li>
            </Link>

            {
                lists.map((value,key) => {

                    const container = <div key={key} className='border-b-[1px]'>
                        {
                            value.map((innervalue, indx) => {

                                return (
                                    <Link onClick={innervalue?.text=="Logout" && onLogout } key={indx} to={innervalue?.link}>
                                        <li className='px-4 py-[11px] hover:text-blue-600 cursor-pointer '>
                                            {innervalue.text}
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </div>

                    return container
                })
            }

            <li className='px-4 py-[12px] font-bold text-lg flex items-center justify-between '>
                Brainy Business <FaExternalLinkAlt />
            </li>


        </Hover>
    )
}

export default Iprofile
