import React from 'react'
import { BsQuestionSquareFill } from 'react-icons/bs';
import { GiTalk } from "react-icons/gi";
import { IoMdChatboxes } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdAutoGraph, MdOutlineOndemandVideo } from 'react-icons/md'

import LayoutIn from '../Layout/LayoutIn'
import { Link } from 'react-router-dom';

function Courses() {

    const resources = [
        {
            svg: <MdOutlineOndemandVideo className='m-auto size-12' />,
            title: "Test Video",
            p: "Send us a sample video and get expert feedback.",
            link: "/link"
        },
        {
            svg: <IoMdChatboxes className='m-auto size-12' />,
            title: "Instructor Community",
            p: "Connect with experienced instructors. Ask questions, browse discussions, and more."
        },
        {
            svg: <LiaChalkboardTeacherSolid className='m-auto size-12' />,
            title: "Teaching Center",
            p: "Learn about best practices for teaching on Udemy."
        },
        {
            svg: <MdAutoGraph className='m-auto size-12' />,
            title: "Marketplace Insights",
            p: "Validate your course topic by exploring our marketplace supply and demand."
        },
        {
            svg: <BsQuestionSquareFill className='m-auto size-10 mt-2' />,
            title: "Help and Support",
            p: "Browse our Help Center or contact our support team."
        },
    ]

    return (
        <LayoutIn tab={0}>
            <div className='px-12 pt-32'>

                <div className='flex justify-between p-12 border-2 py-12 shadow-md'>
                    <h3 className=' '>Jump Into Course Creation</h3>
                    <Link to={"/instructor/course/create/1"}>
                        <div className='bg-blue-600 text-white font-bold py-3 px-[75px] cursor-pointer hover:bg-blue-700'>Create Your Course</div>
                    </Link>
                </div>

                {/* cards */}
                <div className=''>
                    <h1 className='text-center py-16'>Based on your experience, we think these resources will be helpful.</h1>

                    <div className='flex border-2 shadow-md px-4 py-6 my-4 space-x-28'>

                        <img className='size-56 ml-32' src="https://s.udemycdn.com/instructor/dashboard/engaging-course-2x.jpg" alt="image" />


                        <div className='space-y-7  pt-11'>
                            <h1 className='text-2xl '>Create an Engaging Course</h1>

                            <p>

                                Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.
                            </p>
                            <h4 className='link text-blue-700 hover:text-blue-800 text-[17px]'>Get Started</h4>
                        </div>
                    </div>

                    <div className='flex space-x-8 w-full'>

                        <div className='flex border-2 shadow-md px-4 py-2 my-4 items-center w-[50%]'>
                            <img className='size-40 ml-12' src="https://s.udemycdn.com/instructor/dashboard/video-creation-2x.jpg" alt="" />

                            <div className='space-y-7  pt-4'>
                                <h1 className='text-[21px] '>Get Started with Video</h1>

                                <p>
                                    Quality video lectures can set your course apart. Use our resources to learn the basics.
                                </p>
                                <h4 className='link text-blue-700 hover:text-blue-800 text-[17px]'>Get Started</h4>
                            </div>

                        </div>

                        <div className='flex border-2 shadow-md px-4 py-2 my-4 items-center w-[50%]'>
                            <img className='size-40 ml-12' src="https://s.udemycdn.com/instructor/dashboard/build-audience-2x.jpg" alt="" />

                            <div className='space-y-7  pt-4 '>
                                <h1 className='text-[21px] '>Build Your Audience</h1>

                                <p>
                                    Set your course up for success by building your audience.
                                </p>
                                <h4 className='link text-blue-700 hover:text-blue-800 text-[17px]'>Get Started</h4>
                            </div>

                        </div>

                    </div>

                    {/*  */}

                    <div className='flex border-2 shadow-md px-4 py-6 my-4 space-x-28'>

                        <img className='size-56 ml-32' src="https://s.udemycdn.com/instructor/dashboard/newcomer-challenge-2x.jpg" alt="image" />


                        <div className='space-y-7  pt-11'>
                            <h1 className='text-2xl '>
                                Join the New Instructor Challenge!</h1>

                            <p>
                                Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!
                            </p>
                            <h4 className='link text-blue-700 hover:text-blue-800 text-[17px]'>Get Started</h4>
                        </div>
                    </div>

                </div>

                <div className='py-14 space-y-12'>

                    <h1 className='text-center'>
                        Have questions? Here are our most popular instructor resources.
                    </h1>

                    <div className='flex  '>

                        {
                            resources.map((value, indx) => {
                                return (
                                    <Link key={indx} to={value?.link} className='w-[20%]' >
                                        <div className='text-center  space-y-3'>
                                            {value.svg}
                                            <h4 className='font-bold text-lg link text-blue-700 '>{value.title}</h4>
                                            <p className='text-sm px-4'>
                                                {value.p}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })
                        }

                    </div>

                    <div className='space-y-9 py-[30px]'>
                        <h1 className='text-center'>
                            Are You Ready to Begin?
                        </h1>

                        <Link className='block' to={"/instructor/course/create/1"}>
                            <div className='bg-blue-600 text-center text-white font-bold py-3  cursor-pointer hover:bg-blue-700 m-auto w-[300px]'>Create Your Course</div>
                        </Link>

                    </div>


                </div>

            </div>
        </LayoutIn>
    )
}

export default Courses
