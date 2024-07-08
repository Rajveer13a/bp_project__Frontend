import { list } from 'postcss';
import React from 'react'
import { IoIosArrowBack, IoMdCheckmark, IoMdSettings } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

import Footer from '@/components/Footer';

import CourseStructure from './Pages/CourseStructure';
import Film from './Pages/Film';
import Goals from './Pages/Goals';
import Setup from './Pages/Setup';


function CourseManage() {

    const checkbox = <div className='border border-black rounded-full p-[1.5px]'>
        <IoMdCheckmark className='w-[15px] h-[15px] opacity-0' />
    </div>;

    const { section: active, id } = useParams();

    let render;
    switch (active) {
        case "goals":
            render = <Goals />
            break;
        case "course-structure":
            render = <CourseStructure />
            break;
        case "setup":
            render = <Setup />
            break;
        case "film":
            render = <Film />
            break;

    }


    const sections = [
        {
            title: "Plan your course",
            list: [
                { name: "Intended learners", link: "goals" },
                { name: "Course structure", link: "course-structure" },
                { name: "Setup & test video", link: "setup" },
            ]
        },

        {
            title: "Create your content",
            list: [
                { name: "Film & edits", link: "film" },
                { name: "Curriculum", link: "curriculum" },
                { name: "Captions (optional)", link: "captions" },
                { name: "Accessibility (optional)", link: "accessibility" },
            ]
        },

        {
            title: "Publish your course",
            list: [
                { name: "Course landing page", link: "basics" },
                { name: "Pricing", link: "pricing" },
                { name: "Promotions", link: "promotions" },
                { name: "Course messages", link: "messages" },
            ]
        },

    ]

    return (
        <div className=''>
            {/* top bar */}
            <div className='flex fixed bg-[#2D2F31] px-6 py-2  text-white w-full  gap-4 items-center shadow-lg z-10'>

                <div className='font-medium flex items-center gap-1 cursor-pointer hover:text-[#E0E0E0]  '>
                    <IoIosArrowBack className='w-[18px] h-[18px] ' />
                    <h1 >Back to courses </h1>
                </div>

                <h1 className='font-bold text-xl'>Learn Photoshop from the scratch</h1>

                <h4 className='bg-[#6A6F73] px-2 text-sm font-bold my-auto py-[2px]'>DRAFT</h4>

                <h3 className='font-semibold'>0min of video content uploaded</h3>

                <button className='bg-[#969798] text-black px-6 py-1 font-bold ml-auto'>Save</button>

                <IoMdSettings className='size-6 cursor-pointer  h-[40px]' />
            </div>

            {/* main */}
            <div className='p-6 flex relative top-16  '>

                <div className='w-[20%]  pt-8  space-y-10 '>

                    {sections.map((section) => {
                        const comp = <ul key={uuidv4()} className=''>
                            <h1 className='font-bold py-2 pl-8'>{section.title}</h1>

                            {
                                section.list.map((value) => {
                                    return (
                                        <Link to={`/instructor/course/${id}/manage/${value.link}`} key={uuidv4()}>
                                            <li className={`flex items-center gap-2 cursor-pointer  py-2 hover:bg-[#F7F9FA] duration-75 ${(value.link === active) && "activeBlack"} pl-8`}>

                                                {checkbox}

                                                <h1 className=''>
                                                    {value.name}
                                                </h1>

                                            </li>
                                        </Link>
                                    )
                                })
                            }


                        </ul>;


                        return comp
                    })}

                    <button className='bg-blue-600 text-white  font-bold  px-10 py-3 '>Submit for Review</button>

                </div>

                <div className='w-[80%] shadow-2xl border  pt-8 pb-16 mb-24'>
                    {/* <Goals /> */}
                    {/* <CourseStructure/> */}
                    {/* <Setup/> */}
                    {render}
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default CourseManage
