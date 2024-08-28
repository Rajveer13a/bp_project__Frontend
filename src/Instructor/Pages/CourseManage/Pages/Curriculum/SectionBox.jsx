
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { IoDocumentOutline } from 'react-icons/io5';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addLecture, courseDetails, deleteSection, updateSection } from '@/Redux/Slices/Instructor/InstructorSlice';

import Input from './Input';
import Lecture from './Lecture';

export default function SectionBox({ indx, value,onDeleteRequest }) {
    const [editSection, setEditSection] = useState(false);
    const [editSectionData, setEditSectionData] = useState({
        title: value?.title,
        learningObjective: ""
    })

    const { id: course_id } = useParams();

    const [lectureTitle, setLectureTitle] = useState("");


    const onAddLecture = async () => {

        const res = await dispatch(
            addLecture({
                section_id: value._id,
                course_id,
                title: lectureTitle
            })
        )

        if (res.payload.data) {
            dispatch(courseDetails(course_id))
        }

        setLectureTitle("");
        setLectureActive(false);
        setCurriculumActive(false);
    }

    const [curriculumActive, setCurriculumActive] = useState(false);

    const dispatch = useDispatch();

    const [lectureActive, setLectureActive] = useState(false);

    const handleUserInput = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setEditSectionData({
            ...editSectionData,
            [name]: value
        })

    }

    const handleDeleteSection = () => {
        const thunk = () => dispatch(deleteSection(value._id));
        onDeleteRequest(thunk)
    }




    const onEditSectionSave = () => {
        dispatch(updateSection({
            _id: value?._id,
            payload: editSectionData
        }));

        setEditSection(false)
    }

    return (
        <div className='border border-black  bg-[#F7F9FA] px-2  pb-6 pt-3'>

            { 
                !editSection ? (  //display Section title

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

                        // edit section title 
                    <div className='  w-full  group border border-black mt-2 p-2 h-[170px] overflow-hidden flex flex-col bg-white'>

                        <div className='flex gap-1'>
                            <h1 className='font-bold'>Section 1:</h1>

                            <Input count={80} placeholder={"Enter a title"} autoFocus={true} onChange={handleUserInput} name={"title"} value={editSectionData.title} />
                        </div>

                        <div className='pt-4 pl-20 space-y-2 w-[109%]'>
                            <h3 className='font-bold text-sm'>What will students be able to do at the end of this section?</h3>
                            <Input count={200} placeholder={"Enter a learning objective"} onChange={handleUserInput} name={"learningObjective"} value={editSectionData.learningObjective} />
                        </div>

                        <div className='text-sm font-bold space-x-4 ml-auto py-4 pr-3'>
                            <button onClick={() => {
                                setEditSection(false);
                                setEditSectionData({
                                    title: value?.title,
                                    learningObjective: ""
                                })

                            }} className='text-slate-900 hover:text-slate-800 duration-150'>
                                Cancel
                            </button>

                            <button
                                className='bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 duration-150'
                                onClick={onEditSectionSave}
                            >
                                Save Section
                            </button>
                        </div>

                    </div>


                )
            }

            {/* list lectures here */}

            {
                value?.lectures?.map(
                    (data, indx) => <Lecture key={indx} indx={indx} title={data.title} onDeleteRequest={onDeleteRequest} lecture_id={data._id} />
                )
            }


            {/* +curriculum button */}
            <div className='relative ml-14 mt-8 '>

                <button onClick={() => setCurriculumActive(true)} className={`bg-white border border-black font-bold px-4 py-[5px] text-[14.5px] flex gap-1 hover:bg-[#DCE2E6] duration-75  pl-8 ${curriculumActive && "hidden"}`}>

                    <h1>Curriculum item</h1>
                </button>

                <FiPlus onClick={() => {
                    setCurriculumActive(!curriculumActive);
                    setLectureActive(false)
                }} className={`size-[23px] ${curriculumActive && "-translate-x-12 -translate-y-7 rotate-45"} transition-all duration-700 absolute top-[5px] left-2 cursor-pointer`} />
            </div>
            


            {/* list of curicullum items displyed  */}
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


            {/* add new lecture input field display */}

            {
                lectureActive && (
                    <div className=' py-2 w-[94%] bg-white border border-black ml-14 mt-8   pl-5  pr-2 flex flex-col'>

                        <div className='flex items-center gap-3' >

                            <h1 className='text-nowrap'>New Lecture:</h1>

                            <Input count={80} placeholder={"Enter a title"} onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} name={"title"} />

                        </div>

                        <div className='text-sm font-bold space-x-4 ml-auto pt-4 pb-1 pr-3'>
                            <button onClick={() => {
                                setCurriculumActive(false);
                                setLectureActive(false);
                            }} className='text-slate-900 hover:text-slate-800 duration-150 py-2'>
                                Cancel
                            </button>

                            <button onClick={onAddLecture} className='bg-gray-900 hover:bg-gray-800 text-white px-2 py-2 duration-150'>
                                Add Lecture
                            </button>
                        </div>

                    </div>
                )
            }

        </div>
    )
}

