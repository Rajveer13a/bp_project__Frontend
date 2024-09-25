import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdOutlineFormatBold, MdOutlineFormatItalic } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

import { instructorDetails, updateInstructorDetails } from '@/Redux/Slices/Instructor/InstructorSlice';

import LayoutIn from '../../Layout/LayoutIn'
import Marketing from './Marketing';
import Payouts from './Payouts';
import PersonalInfo from './PersonalInfo';
import ProfilePicture from './ProfilePicture';
import Terms from './Terms';



function InstructorProfile() {

  const dispatch = useDispatch();

  const step = useSelector((state)=>state.instructor.data?.profileCompleted?.step)

  const [active, setActive] = useState("personal-info");

  const [ render , setRender] = useState(null);

  
  

  useEffect(()=>{
    switch (step) {
      case 1:
        setRender(<PersonalInfo/>);
        setActive("personal-info");
        break;
      case 2:
        setRender(<ProfilePicture/>);
        setActive("profile-picture");
        break;
      case 3:
        setRender(<Terms/>);
        setActive("terms");
        break;
      case 4:
        setRender(<Marketing/>);
        setActive("marketing");
        break;
      case 5:
        setRender(<Payouts/>);
        setActive("payouts");
        break;
    
      default:
        break;
    }
  },[step])

  useEffect(()=>{
    dispatch(instructorDetails())
  },[])
  

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

        {/* <Payouts/> */}

        {render}

      </div>

    </LayoutIn>
  )
}

export default InstructorProfile
