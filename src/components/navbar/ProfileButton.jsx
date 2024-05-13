import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { logout } from '@/Redux/Slices/AuthSlice';

import HoverMenu from './HoverMenu'

function ProfileButton({className}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function onlogout(){
    const res = dispatch(logout());

    if(res?.payload?.success){
      navigate('/')
    }
  }

  return (
    <div className={`dropdown dropdown-end dropdown-hover h-[46px] ${className}`}>
    <div tabIndex={0} role="button" className="m-1 whitespace-nowrap hover:text-blue-600 h-[150%]">

  
        <div className='btn btn-ghost btn-circle avatar'>
        <div className="w-10 rounded-full ">
          <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>

        </div>

    </div>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 top-[65px] ">
  
      
    <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={onlogout}>Logout</a></li>
      
  
    </ul>
    
  </div>
  )
}

export default ProfileButton
