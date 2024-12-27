import {useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { addSection, courseDetails } from '@/Redux/Slices/Instructor/InstructorSlice';

import Input from './Input';
import SectionBox from './SectionBox';


function Curriculum({ onDeleteRequest }) {

    const dispatch = useDispatch();

    const data = useSelector((data) => data?.instructor?.edit);

    const [sectionData, setSectionData] = useState({
        index: "",
        title: "",
        learningObjective: ""
    });

    const [addSectionActive, setAddSectionActive] = useState(false);

    const handleSectionInput = (e) => {
        const { name, value } = e.target;
        setSectionData({ ...sectionData, [name]: value })
    }

    const onAddSection = async() => {
        setAddSectionActive(false);
        setSectionData({
            index: "",
            title: "",
            learningObjective: ""
        })

        const res = await dispatch(addSection({
            id: data._id,
            title: sectionData.title,
            learningObjective: sectionData.learningObjective
        }));

        if(res?.payload){
            dispatch(courseDetails(data._id))
        }
    }

    return (
        <div>


            <h1 className='font-semibold text-2xl pl-12 border-b h-16'>Curriculum</h1>


            <div className=' px-10  space-y-2 w-[90%] py-10  ' >
                <p>
                    Start putting together your course by creating sections, lectures and practice (quizzes, coding exercises and assignments).
                </p>
                <p className=''>
                    Start putting together your course by creating sections, lectures and practice activities <Link className='link link-primary'>(quizzes, coding exercises and assignments)</Link>. Use your <Link className='link link-primary'>course outline</Link> to structure your content and label your sections and lectures clearly. If you’re intending to offer your course for free, the total length of video content must be less than 2 hours.
                </p>
            </div>

            {/* curriculum */}
            <div className='px-10 mt-6 space-y-4 min-h-[70vh]'>

                {data.sections?.map((value, indx) => {
                    return (
                        <>
                            <SectionBox
                                value={value}
                                indx={indx}
                                onDeleteRequest={onDeleteRequest}
                            />

                        </>
                    )
                })}


                {/* add section button */}
                <div className='relative'>

                    <button onClick={() => setAddSectionActive(true)} className={`bg-white border border-black font-bold px-4 py-[5px] text-[14.5px] flex gap-1 hover:bg-[#DCE2E6] duration-75  pl-8 ${addSectionActive && "opacity-0 pointer-events-none"}`}>

                        <h1>Section</h1>
                    </button>

                    <FiPlus onClick={() => setAddSectionActive(!addSectionActive)} className={`size-[22px] absolute top-1 left-2 ${addSectionActive && "-translate-x-4 rotate-45"}  duration-700 cursor-pointer`} />
                </div>
                
                
                {/* add new section input display */}

                {
                    addSectionActive && (
                        <div className='  w-full  group border border-black mt-2 p-2 h-[170px] overflow-hidden flex flex-col bg-white'>

                            <div className='flex gap-1'>
                                <h1 className='font-bold'>Section 1:</h1>

                                <Input count={80} placeholder={"Enter a title"} autoFocus={true} onChange={handleSectionInput} name={"title"} value={sectionData.title} />
                            </div>

                            <div className='pt-4 pl-20 space-y-2 w-[109%]'>
                                <h3 className='font-bold text-sm'>What will students be able to do at the end of this section?</h3>
                                <Input count={200} placeholder={"Enter a learning objective"} onChange={handleSectionInput} name={"learningObjective"} value={sectionData.learningObjective} />
                            </div>

                            <div className='text-sm font-bold space-x-4 ml-auto py-4 pr-3'>
                                <button onClick={() => setAddSectionActive(false)} className='text-slate-900 hover:text-slate-800 duration-150'>
                                    Cancel
                                </button>

                                <button onClick={onAddSection} className='bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 duration-150'>
                                    Add Section
                                </button>
                            </div>

                        </div>
                    )
                }




            </div>


        </div>
    )
}

export default Curriculum
