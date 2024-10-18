
import { data } from 'autoprefixer';
import React, { useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import DragInputList from '@/Instructor/components/DragInputList';
import { courseDetails, updateGoals } from '@/Redux/Slices/Instructor/InstructorSlice';
import { Review } from './LandingPageReview';





function GoalsReview() {

    const data = useSelector((state) => state.management.feedback.goals);

    const dispatch = useDispatch();

    const placeholders = [
        "Example: Define the roles and responsibilities of a project manager",
        "Example: Estimate project timelines and budgets",
        "Example: Identify and manage project risks",
        "Example: Complete a case study to manage a project from conception to completion"
    ]

    const placeholders2 = ["Example: No programming experience needed. You will learn everything you need to know"]

    const placeholders3 = ["Example: Beginner Python developers curious about data science"]




    return (
        <div>

            <div className='flex items-center '>
                <h1 className='font-semibold text-2xl border-b  pb-6 px-12'>
                    Intended learners
                </h1>

                <div className='w-[60%] pb-6  '>
                    <Review holder={"intended"} />
                </div>

            </div>



            <div className=' pl-12  w-[87%]'>
                <p className='py-10'>
                    The following descriptions will be publicly visible on your <Link className='link link-primary'>Course Landing Page</Link> and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.
                </p>

                <div className=' space-y-2'>
                    <h1 className='font-bold'>What will students learn in your course?</h1>
                    <p className=''>You must enter at least 4 learning <Link className='link link-primary'>objectives or outcomes</Link> that learners can expect to achieve after completing your course.</p>

                    <div className='pointer-events-none'>
                        <DragInputList addActive={true} name={"objectives"} state={[data]} placeholders={placeholders} />
                    </div>
                </div>

                <div className=' space-y-2 pt-8'>
                    <h1 className='font-bold'>What are the requirements or prerequisites for taking your course?</h1>
                    <p className=''>List the required skills, experience, tools or equipment learners should have prior to taking your course.
                        If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</p>

                    <div className='pointer-events-none'>
                        <DragInputList addActive={true} name={"prerequisites"} state={[data]} placeholders={placeholders2} />
                    </div>
                </div>

                <div className=' space-y-2 pt-8'>
                    <h1 className='font-bold'>Who is this course for?</h1>
                    <p className=''>Write a clear description of the <Link className='link link-primary'>intended learners</Link>  for your course who will find your course content valuable.
                        This will help you attract the right learners to your course.</p>

                    <div className='pointer-events-none'>
                        <DragInputList addActive={true} name={"intended_learners"} state={[data]} placeholders={placeholders3} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GoalsReview
