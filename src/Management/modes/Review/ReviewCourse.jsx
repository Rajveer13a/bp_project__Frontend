import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosArrowBack, IoMdCheckmark, IoMdSettings } from 'react-icons/io';
import { IoDocumentOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'

import Footer from '@/components/Footer';
import DisplayCurriculum from './DisplayCurriculum';




function ReviewCourse() {

    const location = useLocation();
    const state  =  location.state;

    const [showDialog, setShowDialog] = useState(false);
    const [onConfirm, setOnConfirm] = useState(null);

    

    const dispatch = useDispatch();


    const checkbox = <div className='border border-black rounded-full p-[1.5px]'>
        <IoMdCheckmark className='w-[15px] h-[15px] opacity-0' />
    </div>;

    const [active ,  setActive] = useState("curriculum");


    let render;
    switch (active) {
        case "goals":
            render = ""
            break;

        case "curriculum":
            render = <DisplayCurriculum />
            break;

    }

    const sections = [
        {
            title: "TO Check",
            list: [
              
                { name: "Intended learners", active: "goals" },
                
                { name: "Course landing page", active: "basics" },
                
                { name: "Course messages", active: "messages" },
                
                { name: "Curriculum", active: "curriculum" },

                { name: "Captions (optional)", active: "captions" },

                { name: "Accessibility (optional)", active: "accessibility" },
            ]
        },

        

    ]


    return (
        <div className=''>
            
            {/* top bar */}
            <div className='flex fixed bg-[#2D2F31] px-6 py-2  text-white w-full  gap-4 items-center shadow-lg z-10'>

                <Link to={"/management/mode"}>
                    <div className='font-medium flex items-center gap-1 cursor-pointer hover:text-[#E0E0E0]  '>
                        <IoIosArrowBack className='w-[18px] h-[18px] ' />
                        <h1 >Back to courses </h1>
                    </div>
                </Link>

                <h1 className='font-bold text-xl'>{state.title}</h1>

                <h4 className='bg-[#6A6F73] px-2 text-sm font-bold my-auto py-[2px]'>DRAFT</h4>

                <h3 className='font-semibold'>0min of video content uploaded</h3>

                <IoMdSettings className='size-6 cursor-pointer  h-[40px]' />

            </div>

            {/* main */}
            <div className='p-6 flex relative top-16  '>

                <div className='w-[20%]  pt-8  space-y-10 '>

                    {sections.map((section,indx) => {
                        const comp = <ul key={indx} className=''>
                            <h1 className='font-bold py-2 pl-8'>{section.title}</h1>

                            {
                                section.list.map((value,indx) => {
                                    return (
                                        <li key={indx} onClick={()=> setActive(value.active)} className={`flex items-center gap-2 cursor-pointer  py-2 hover:bg-[#F7F9FA] duration-75 ${(value.active === active) && "activeBlack"} pl-8`}>

                                                {checkbox}

                                                <h1 className=''>
                                                    {value.name}
                                                </h1>

                                            </li>
                                    )
                                })
                            }


                        </ul>;


                        return comp
                    })}

                    <button className='bg-blue-600 text-white  font-bold  px-10 py-3 '>Approve Course</button>

                </div>

                <div className='w-[80%] shadow-2xl border  pt-8 pb-16 mb-24 min-h-screen'>
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

export default ReviewCourse
