import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdOutlineFormatBold, MdOutlineFormatItalic } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

import { instructorDetails, updateInstructorDetails } from '@/Redux/Slices/Instructor/InstructorSlice';

import LayoutIn from '../../Layout/LayoutIn'
import PersonalInfo from './PersonalInfo';
import ProfilePicture from './ProfilePicture';
import Terms from './Terms';
import Marketing from './Marketing';
import Payouts from './Payouts';



function InstructorProfile() {



  const [active, setActive] = useState("personal-info");

  

  return (
    <LayoutIn>
      <div className='pt-28 space-y-11 px-11 pb-20 '>

        <h1 className='text-center text-4xl font-semibold '>
          Premium Instructor Application
        </h1>

        <div className='relative text-slate-600'>
          <div className='flex  font-semibold justify-between px-6'>
            <h1 className={`relative ${active == "personal-info" && "underBlack text-black"}`}>Personal Information</h1>
            <h1 className={`relative ${active == "profile-picture" && "underBlack text-black"}`}>Profile Picture</h1>
            <h1 className={`relative ${active == "terms" && "underBlack  text-black"}`}>Instructor Terms</h1>
            <h1 className={`relative ${active == "marketing" && "underBlack text-black"}`}>Udemy Marketing </h1>
            <h1 className={`relative ${active == "payouts" && "underBlack text-black"}`}>Payouts & Tax Details</h1>

          </div>
          <div className='h-[2px] w-[100%] bg-[#D1D7DC] absolute -bottom-4'></div>
        </div>

        {/* <PersonalInfo/> */}

        {/* <ProfilePicture/> */}

        {/* <Terms/> */}

        {/* <Marketing/> */}

        <Payouts/>

      </div>

    </LayoutIn>
  )
}

export default InstructorProfile
