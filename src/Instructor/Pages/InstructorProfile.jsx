import React, { useState } from 'react'
import { MdOutlineFormatBold, MdOutlineFormatItalic } from 'react-icons/md'
import { useSelector } from 'react-redux';

import LayoutIn from '../Layout/LayoutIn'

function InstructorProfile() {

  const data = useSelector((state) => state.auth?.data);

  const [active, setActive] = useState("personal-info");

  const [fieldData, setFieldData] = useState({
    firstname: data?.username || "",
    lastname: data?.lastname || "",
    headline: data?.headline || "",
    bio: data?.bio || ""
  })

  const onUserInput = (e) => {
    const { name, value } = e.target;
    setFieldData({
      ...fieldData,
      [name]: value
    })
  }

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

            <input value={data?.email} disabled placeholder='Email' className='border border-black block w-[500px] px-3 py-2.5 outline-none placeholder:text-slate-500 disabled:opacity-60' type="text" />

            <h1 className='font-semibold'>
              Biography:
            </h1>

            <div>

              <div className='flex gap-5 border-x border-t border-black p-2'>
                <MdOutlineFormatBold className='size-5' />
                <MdOutlineFormatItalic className='size-5' />
              </div>

              <textarea
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

            <button className='bg-slate-800 text-white font-bold px-3 p-2 hover:bg-slate-700 transition-all duration-100'>Save and Continue</button>

          </div>


        </div>

      </div>

    </LayoutIn>
  )
}

export default InstructorProfile
