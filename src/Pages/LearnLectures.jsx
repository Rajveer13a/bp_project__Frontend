import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import HomeLayout from '@/Layouts/HomeLayout'
import { getlectures } from '@/Redux/Slices/CourseSlice';
import Logo from '@/components/Logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';

function LearnLectures() {

  const { course_id } = useParams();

  const dispatch = useDispatch();

  const data = useSelector((state)=> state.course?.learn);

  

  useEffect(()=>{
    dispatch(getlectures({ course_id}));
  }, [])

  return (

    <>

      <div className='bg-neutral h-20 text-white font-semibold text-xl flex space-x-5 items-center px-5'>
          <Logo/>
          <h1>{data?.title}</h1>
      </div>

      <div className='flex h-[80vh]'>

          
        <div className='w-[70%]'>
          <div className='bg-[#2D2F31] w-full flex justify-center'>
            <video className='w-[80%] px-8'  controls src={ data?.sections ? (data?.sections[0]?.lectures[0]?.resource?.secure_url) : "" }></video>
          </div>
        </div>

        <div className=' bg-slate-700'>
          
        </div>


      </div>
      
    </>


  )
}

export default LearnLectures
