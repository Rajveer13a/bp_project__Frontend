import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdOutlineFormatBold, MdOutlineFormatItalic } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

import { instructorDetails, updateInstructorDetails } from '@/Redux/Slices/Instructor/InstructorSlice';

function PersonalInfo() {
    const dispatch = useDispatch();

  const instructorData = useSelector((state) => state.instructor?.data);
  console.log(instructorData);
  
  const authData = useSelector((state) => state.auth?.data);

  const [fieldData, setFieldData] = useState({
    firstname: "",
    lastname: "",
    headline:  "",
    bio:""
  })

  const onUserInput = (e) => {
    const { name, value } = e.target;
    setFieldData({
      ...fieldData,
      [name]: value
    })
  }

  const onSave = async()=>{
    
    
    const {firstname, lastname, headline, bio} = fieldData;
  
    if([firstname, lastname, headline, bio].some(value=> value==undefined || value?.trim()=="")){
        toast.error("all field are required");
        return;
    }

    if(bio.length < 50){
      toast.error("Biography: should have at least 50 character");
      return;
    }

    const res = await dispatch(updateInstructorDetails({
      bio,
      headline
    }));
    
  }

  useEffect(() => {
    if (instructorData && authData) {
      setFieldData({
        firstname: authData?.username || "",
        lastname: authData?.lastname || "",
        headline: instructorData?.headline || "",
        bio: instructorData?.bio || ""
      });
    }
  }, [instructorData, authData]);

  useEffect(()=>{
    dispatch(instructorDetails());
  },[])

  const textAreaRef = useRef(null);

  useEffect(() => {
      if (textAreaRef.current) {
          textAreaRef.current.style.height = 'auto';
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
  }, [fieldData.bio]);

  return (
    <div className='flex flex-col items-center'>

          <div className='space-y-4 w-[500px]'>
            <h1 className='font-semibold'>
              Basics:
            </h1>

            <input name='firstname' onChange={onUserInput} value={fieldData.firstname} placeholder='FirstName' className='border border-black block w-[500px] px-3 py-2.5 outline-none placeholder:text-slate-500' type="text" />

            <input name='lastname' onChange={onUserInput} value={fieldData.lastname} placeholder='LastName' className='border border-black block w-[500px] px-3 py-2.5 outline-none placeholder:text-slate-500' type="text" />

            <div className='relative'>
              <input maxLength={60} name='headline' onChange={onUserInput} value={fieldData.headline} placeholder='Headline' className='border border-black block w-[500px] px-3 pr-11 py-2.5 outline-none placeholder:text-slate-500' type="text" />
              <h4 className='absolute right-4 top-3'>{60-fieldData?.headline?.length}</h4>
            </div>
            <h4 className='text-xs'>Add a professional headline like, "Instructor at Brainy" or "Architect."</h4>

            <input value={authData?.email} disabled placeholder='Email' className='border border-black block w-[500px] px-3 py-2.5 outline-none placeholder:text-slate-500 disabled:opacity-60' type="text" />

            <h1 className='font-semibold'>
              Biography:
            </h1>

            <div>

              <div className='flex gap-5 border-x border-t border-black p-2'>
                <MdOutlineFormatBold className='size-5' />
                <MdOutlineFormatItalic className='size-5' />
              </div>

              <textarea
              ref={textAreaRef}
                name="bio"
                onChange={onUserInput}
                value={fieldData.bio}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className='border border-black w-[100%]  outline-none px-4 placeholder:text-slate-600 overflow-hidden resize-none h-auto py-2'
                id=""></textarea>

            </div>

            <h4 className='text-xs '>Your instructor biography should emphasize your experience and expertise. It should have at least 50 characters and may not contain links or coupon codes.</h4>

            <button onClick={onSave} className='bg-slate-800 text-white font-bold px-3 p-2 hover:bg-slate-700 transition-all duration-100'>Save and Continue</button>

          </div>


        </div>
  )
}

export default PersonalInfo
