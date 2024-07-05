
import { data } from 'autoprefixer';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import DragInputList from '../components/DragInputList';



function Goals() {

  const placeholders = [
    "Example: Define the roles and responsibilities of a project manager",
    "Example: Estimate project timelines and budgets", 
    "Example: Identify and manage project risks",
    "Example: Complete a case study to manage a project from conception to completion"
  ]

  const [data, setData] = useState({
    objectives: Array(4).fill(""),
  })




  return (
    <div>
      <h1 className='font-semibold text-2xl pl-12 border-b h-16'>Intended learners</h1>

      <div className=' pl-12  w-[87%]'>
        <p className='py-10'>
          The following descriptions will be publicly visible on your <Link className='link link-primary'>Course Landing Page</Link> and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.
        </p>

        <div className=' space-y-2'>
          <h1 className='font-bold'>What will students learn in your course?</h1>
          <p className=''>You must enter at least 4 learning <Link className='link link-primary'>objectives or outcomes</Link> that learners can expect to achieve after completing your course.</p>

          <DragInputList initailState={{ objectives: Array(4).fill("") }} name={"objectives"} state={[data, setData]} placeholders={placeholders} />



        </div>

      </div>
    </div>
  )
}

export default Goals
