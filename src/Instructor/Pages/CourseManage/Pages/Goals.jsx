
import { data } from 'autoprefixer';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import DragInputList from '../../../components/DragInputList';



function Goals() {

  const placeholders = [
    "Example: Define the roles and responsibilities of a project manager",
    "Example: Estimate project timelines and budgets", 
    "Example: Identify and manage project risks",
    "Example: Complete a case study to manage a project from conception to completion"
  ]

  const placeholders2 = ["Example: No programming experience needed. You will learn everything you need to know"]

  const placeholders3 = [ "Example: Beginner Python developers curious about data science"]


  const [data, setData] = useState({
    objectives: Array(4).fill(""),
    prerequisites : [""],
    "intended-learners" : [""]
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

          <DragInputList  name={"objectives"} state={[data, setData]} placeholders={placeholders} />
        </div>

        <div className=' space-y-2 pt-8'>
          <h1 className='font-bold'>What are the requirements or prerequisites for taking your course?</h1>
          <p className=''>List the required skills, experience, tools or equipment learners should have prior to taking your course.
          If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</p>

          <DragInputList name={"prerequisites"} state={[data, setData]} placeholders={placeholders2} />
        </div>

        <div className=' space-y-2 pt-8'>
          <h1 className='font-bold'>Who is this course for?</h1>
          <p className=''>Write a clear description of the <Link className='link link-primary'>intended learners</Link>  for your course who will find your course content valuable.
          This will help you attract the right learners to your course.</p>

          <DragInputList name={"intended-learners"} state={[data, setData]} placeholders={placeholders3} />
        </div>

      </div>
    </div>
  )
}

export default Goals
