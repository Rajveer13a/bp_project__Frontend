import React, { useEffect, useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { IoDocumentOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

import { addSection, courseDetails, deleteSection } from '@/Redux/Slices/Instructor/InstructorSlice';

const Input = ({ count, placeholder, autoFocus = false, onChange, name, value }) => {


    return (
        <div className='w-[90%] relative'>
            <input className='border border-black w-full h-[30px] px-3 text-sm placeholder:text-slate-600 focus:outline-none' type="text" placeholder={placeholder} maxLength={count} autoFocus={autoFocus} onChange={onChange} name={name} value={value} />
            <h1 className='absolute top-1 right-4 text-sm text-slate-800'>
                {count - (value?.length || 0)}
            </h1>

        </div>
    )
}

const SectionBox = ({ indx, value, handleSectionInput, sectionData, handleLectureInput, lectureData, onDeleteRequest }) => {
    const [editSection, setEditSection] = useState(false);
    const [curriculumActive, setCurriculumActive] = useState(false);
    const dispatch = useDispatch();

    const [lectureActive, setLectureActive] = useState(false);

    const handleDeleteSection = () => {
        const thunk = () => dispatch(deleteSection(value._id));
        onDeleteRequest(thunk)
    }

    return (
        <div className='border border-black  bg-[#F7F9FA] px-2  pb-6 pt-3'>

            {
                !editSection ? (

                    <div className='flex items-center w-full gap-1 group'>
                        <h1 className='font-bold'>Section {indx + 1}:</h1>
                        <IoDocumentOutline />
                        <h1>{value?.title}</h1>
                        <div className='gap-2 flex opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-100 cursor-pointer ml-2 py-4'>
                            <MdEdit onClick={() => setEditSection(true)} />
                            <MdDelete onClick={handleDeleteSection} />
                        </div>
                    </div>

                ) : (


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
                            <button onClick={() => setEditSection(false)} className='text-slate-900 hover:text-slate-800 duration-150'>
                                Cancel
                            </button>

                            <button className='bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 duration-150'>
                                Save Section
                            </button>
                        </div>

                    </div>


                )
            }

            <div className='relative ml-14 mt-8 '>

                <button onClick={() => setCurriculumActive(true)} className={`bg-white border border-black font-bold px-4 py-[5px] text-[14.5px] flex gap-1 hover:bg-[#DCE2E6] duration-75  pl-8 ${curriculumActive && "hidden"}`}>

                    <h1>Curriculum item</h1>
                </button>

                <FiPlus onClick={() => {
                    setCurriculumActive(!curriculumActive);
                    setLectureActive(false)
                }} className={`size-[23px] ${curriculumActive && "-translate-x-12 -translate-y-7 rotate-45"} transition-all duration-700 absolute top-[5px] left-2 cursor-pointer`} />
            </div>

            {
                (curriculumActive && !lectureActive) && (
                    <div className=' py-2 w-[94%] bg-white border border-dashed border-black ml-14 mt-8 text-blue-700 font-bold flex items-center pl-5 gap-4'>

                        <button onClick={() => setLectureActive(true)} className='flex items-center gap-1 hover:text-blue-900 duration-75'>
                            <FiPlus className='size-5' />
                            Lecture
                        </button>

                        <button className='flex items-center gap-1 hover:text-blue-900 duration-75'>
                            <FiPlus className='size-5' />
                            Quiz
                        </button>

                        <button className='flex items-center gap-1 hover:text-blue-900 duration-75'>
                            <FiPlus className='size-5' />
                            Coding Exercise
                        </button>

                        <button className='flex items-center gap-1 hover:text-blue-900 duration-75 opacity-30 cursor-not-allowed'>
                            <FiPlus className='size-5' />
                            Practice Test
                        </button>

                        <button className='flex items-center gap-1 hover:text-blue-900 duration-75'>
                            <FiPlus className='size-5' />
                            Assignment
                        </button>



                    </div>
                )
            }

            {
                lectureActive && (
                    <div className=' py-2 w-[94%] bg-white border border-black ml-14 mt-8   pl-5  pr-2 flex flex-col'>

                        <div className='flex items-center gap-3' >

                            <h1 className='text-nowrap'>New Lecture:</h1>

                            <Input count={80} placeholder={"Enter a title"} onChange={handleLectureInput} value={lectureData.title} name={"title"} />

                        </div>

                        <div className='text-sm font-bold space-x-4 ml-auto pt-4 pb-1 pr-3'>
                            <button onClick={() => {
                                setCurriculumActive(false);
                                setLectureActive(false);
                            }} className='text-slate-900 hover:text-slate-800 duration-150 py-2'>
                                Cancel
                            </button>

                            <button className='bg-gray-900 hover:bg-gray-800 text-white px-2 py-2 duration-150'>
                                Add Lecture
                            </button>
                        </div>

                    </div>
                )
            }

        </div>
    )
}



function Curriculum({ onDeleteRequest }) {

    const dispatch = useDispatch();

    const data = useSelector((data) => data.instructor.edit);



    const [sectionData, setSectionData] = useState({
        index: "",
        title: "",
        learningObjective: ""
    });


    const [lectureData, setLectureData] = useState({
        title: ""
    })



    const [addSectionActive, setAddSectionActive] = useState(false);

    const handleSectionInput = (e) => {
        const { name, value } = e.target;
        setSectionData({ ...sectionData, [name]: value })
    }

    const handleLectureInput = (e) => {
        const { name, value } = e.target;
        setLectureData({ ...lectureData, [name]: value })
    }


    const onAddSection = () => {
        setAddSectionActive(false);
        setSectionData({
            index: "",
            title: "",
            learningObjective: ""
        })

        dispatch(addSection({
            id: data._id,
            title: sectionData.title
        }));
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
                                handleLectureInput={handleLectureInput}
                                handleSectionInput={handleSectionInput}
                                sectionData={sectionData}
                                lectureData={lectureData}
                                onDeleteRequest={onDeleteRequest}
                            />

                        </>
                    )
                })}

                <div className='relative'>
                    <button onClick={() => setAddSectionActive(true)} className={`bg-white border border-black font-bold px-4 py-[5px] text-[14.5px] flex gap-1 hover:bg-[#DCE2E6] duration-75  pl-8 ${addSectionActive && "opacity-0 pointer-events-none"}`}>

                        <h1>Section</h1>
                    </button>

                    <FiPlus onClick={() => setAddSectionActive(!addSectionActive)} className={`size-[22px] absolute top-1 left-2 ${addSectionActive && "-translate-x-4 rotate-45"}  duration-700 cursor-pointer`} />
                </div>

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
