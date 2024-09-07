import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { IoDocumentOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux';

import DisplayLecture from './DisplayLecture';
import VideoPlayer from './VideoPlayer';

function DisplayCurriculum() {

  const state = useSelector((state)=> state.management.feedback.curr);
  
  

  return (
    <>
      {
        state?.map((section,indx)=>{
          return (
            <div key={indx} className='m-12'>

      <div className='bg-[#add8e628] p-3 border border-black'>

        {/* display section name */}
        <div className='flex my-5'>
          <h1 className='font-bold text-lg'>Section {indx+1}: <span className='font-normal'>{section.title} </span></h1>

        </div>

        {/* diplay lectures */}

        <DisplayLecture state={section.lectures} section_indx={indx} />

      </div>
    </div>
          )
        })
      }
      </>
  )
}

export default DisplayCurriculum
