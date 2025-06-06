import React, { useEffect, useState } from 'react'
import { BsQuestionSquareFill } from 'react-icons/bs';
import { CgMediaLive } from "react-icons/cg";
import { FcApproval } from 'react-icons/fc';
import { GiTalk } from "react-icons/gi";
import { GoAlertFill } from 'react-icons/go';
import { IoIosArrowDown, IoMdChatboxes, IoMdSearch } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdAddAlert, MdAutoGraph, MdOutlineAddAlert, MdOutlineOndemandVideo } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { instructorDetails } from '@/Redux/Slices/Instructor/InstructorSlice';

import LayoutIn from '../Layout/LayoutIn'


const Select = ({ sortBy, setSortBy }) => {

    const [dropdown, setDropDown] = useState(false)

    const handleSort = (e) => {
        setSortBy(e.target.textContent);
        setDropDown(false)
    }

    return (
        <div className='relative group'>

            <button onClick={() => setDropDown(!dropdown)} className='border border-black px-4 py-3 font-bold flex items-center gap-2 hover:bg-[#E3E7EA]' htmlFor='dropdown-toggle'>
                {sortBy} <IoIosArrowDown />
            </button>

            <div className={`shadow-lg opacity-0 pointer-events-none border-2  absolute top-14  bg-white w-52  ${dropdown && "pointer-events-auto opacity-100"} bg-white z-20`}>
                <ul className='p-4  text-sm cursor-pointer '>
                    <li onClick={handleSort} className='pb-2 hover:text-blue-600 pee'>Newest</li>

                    <li onClick={handleSort} className='py-2 hover:text-blue-600'>Oldest</li>

                    <li onClick={handleSort} className='py-2 hover:text-blue-600'>A-Z</li>

                    <li onClick={handleSort} className='py-2 hover:text-blue-600'>Z-A</li>

                    <li onClick={handleSort} className='py-2 hover:text-blue-600'>Published First</li>

                    <li onClick={handleSort} className='pt-2 hover:text-blue-600'>Unpublished First</li>
                </ul>
            </div>
        </div>
    )
}

function Courses() {

    const dispatch = useDispatch();

    const courses = useSelector((state) => state.instructor.data.courses);

    const [courselist, setCourseList] = useState(courses);

    const [sortBy, setSortBy] = useState("Newest");

    const [searchTerm, setSearchTerm] = useState("")



    useEffect(() => {
        if (courses) {
            let arr = [...courses];

            arr = arr.filter((value) => value.title.toLowerCase().includes(searchTerm.toLowerCase()))

            switch (sortBy) {
                case "Newest":
                    setCourseList(arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
                    break;

                case "A-Z":
                    setCourseList(arr.sort((a, b) => (a.title > b.title ? 1 : -1)));
                    break;

                case "Z-A":
                    setCourseList(arr.sort((a, b) => (a.title < b.title ? 1 : -1)));
                    break;

                case "Oldest":
                    setCourseList(arr.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1)));
                    break;

                case "Published First":
                    setCourseList(arr.sort((a, b) => (a.approved ? 1 : -1)));
                    break;

                case "Unpublished First":
                    setCourseList(arr.sort((a, b) => (!a.approved ? 1 : -1)));
                    break;


                default:
                    break;
            }
        }

    }, [courses, sortBy, searchTerm])

    useEffect(() => {
        dispatch(instructorDetails())
    }, [])

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
            <div className='px-12 pt-14'>

                {
                    (courses?.length == 0) && (
                        <div className='flex justify-between p-12 border-2 py-12 shadow-md mt-24'>
                            <h3 className=' '>Jump Into Course Creation</h3>
                            <Link to={"/instructor/course/create/1"}>
                                <div className='bg-blue-600 text-white font-bold py-3 px-[75px] cursor-pointer hover:bg-blue-700'>Create Your Course</div>
                            </Link>
                        </div>
                    )
                }

                {/* Show courses */}

                {
                    courses?.length > 0 && <>
                        <h1 className='text-4xl font-semibold py-10'>Courses</h1>

                        <div className='flex gap-8'>

                            <div className='relative h-12 w-[250px] '>

                                <input value={searchTerm} onChange={(e) => setSearchTerm(() => e.target.value)} className='border border-black h-full w-full p-4 pr-16 placeholder:text-slate-600 focus:outline-none' type="text" placeholder='Search your courses' />

                                <button className=' absolute top-0 right-0 text-white bg-black h-full w-[50px] '>
                                    <IoMdSearch className='m-auto size-6' />
                                </button>

                            </div>

                            <Select sortBy={sortBy} setSortBy={setSortBy} />

                            <Link to={"/instructor/course/create/1"} className=' ml-auto mr-1'>
                                <button className='bg-blue-600 font-bold text-white px-3 h-12 '>New Course</button>
                            </Link>





                        </div>

                        <div className='pt-5 space-y-6'>


                            {
                                courselist?.[0]?.title && courselist?.map((value, indx) => {
                                    return (
                                        <div key={indx} className={`border-2  flex w-full group relative gap-2 ${value?.review?.approved && "bg-gradient-to-r from-blue-100 to-blue-400"} ${value?.review?.reviewed == false && "bg-gradient-to-r from-yellow-100 via-orange-100 to-red-200"}`}>
                                            <img className='size-32 p-1  object-cover rounded ' src={value?.thumbnail?.secure_url || "https://s.udemycdn.com/course/200_H/placeholder.jpg"} alt="" />


                                            <div className='py-4 flex flex-col group-hover:opacity-10 duration-100 w-[300px] pl-4' >
                                                <h1 className='font-bold'>{value?.title}</h1>

                                                <h3 className='mt-auto text-sm font-semibold'>{value?.review?.approved ? "Live" : "Draft"}   <span className='text-xs font-normal ml-1'>Public</span></h3>
                                            </div>

                                            {
                                                value?.review?.reviewed == false && <h1 className='font-bold text-xl text-[#3B198F] h-full  absolute   py-12 opacity-100 group-hover:scale-105 duration-100 px-[220px] cursor-pointer  right-[250px]'>Waiting For Approval</h1>
                                            }

                                            {
                                                (value?.review == undefined || value?.review?.reviewed == true) && <>
                                                    <div className='flex flex-grow items-center justify-center space-x-5 group-hover:opacity-10 duration-100'>
                                                        {value?.review?.approved == false && <GoAlertFill className='size-6 fill-red-700 alert-svg absolute left-[40%]' />}

                                                        {
                                                            value?.review?.approved && <>


                                                                <div className='font-bold text-xl text-[#3B198F] h-full  absolute   py-12 opacity-100 group-hover:scale-105 duration-100 px-[220px] cursor-pointer  right-[210px] space-x-4 flex'><h1>Course is Live</h1> <div className='relative flex items-center justify-center'>
                                                                    <FcApproval className='size-8 z-10' /> <CgMediaLive className='size-6 animate-ping  absolute ' /></div> </div>

                                                                {/* <div className='h-2 w-[70%] relative'>
                                        <FcApproval className='size-8 ' />
                                        </div> */}

                                                            </>
                                                        }

                                                        {
                                                            !value?.review?.approved && <>
                                                                <h1 className='font-bold h-7  '>Finish your course</h1>
                                                                <div className='h-2 w-[70%] bg-slate-300 relative'>
                                                                    <div className={`h-2 w-[${value.percentageCompleted}%] bg-blue-600 absolute`}></div>
                                                                </div>
                                                            </>
                                                        }

                                                    </div>

                                                    <Link to={`${window.location.origin}/instructor/course/${value?._id}/manage/goals`}>
                                                        <h1 className='font-bold text-xl text-[#3B198F] h-full  absolute   py-12 opacity-0 group-hover:opacity-100 duration-100 px-[220px] cursor-pointer  right-[250px]'>Edit/ manage course</h1>
                                                    </Link>
                                                </>
                                            }



                                        </div>
                                    )
                                })
                            }


                        </div>
                    </>
                }



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

                    {
                        courselist == 0 && (
                            <div className='space-y-9 py-[30px]'>
                                <h1 className='text-center'>
                                    Are You Ready to Begin?
                                </h1>

                                <Link className='block' to={"/instructor/course/create/1"}>
                                    <div className='bg-blue-600 text-center text-white font-bold py-3  cursor-pointer hover:bg-blue-700 m-auto w-[300px]'>Create Your Course</div>
                                </Link>

                            </div>
                        )
                    }


                </div>

            </div>
        </LayoutIn>
    )
}

export default Courses
