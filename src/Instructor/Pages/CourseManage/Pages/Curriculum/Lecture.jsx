import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { GiCrossMark, GiHamburgerMenu } from 'react-icons/gi';
import { GoPlus } from 'react-icons/go';
import { IoIosPlayCircle, IoMdDocument } from 'react-icons/io';
import { IoDocumentOutline } from 'react-icons/io5';
import { MdDelete, MdEdit } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteLecture } from '@/Redux/Slices/Instructor/InstructorSlice';

import ContentTypeBox from './ContentTypeBox';

function Lecture({ indx, title, onDeleteRequest, lecture_id }) {
    const dispatch = useDispatch()

    const handleDeleteLecture = () => {
        const thunk = () => {
            dispatch(deleteLecture(lecture_id));
        }

        onDeleteRequest(thunk);
    }

    const [addContentActive, setAddContentActive] = useState(false);

    return (
        <div className='bg-white ml-14 mt-8  mr-1 py-1 border border-black'>

            <div className=' flex items-center px-4 group cursor-move' >
                {/* lecture title box */}
                <div className='flex space-x-2 items-center'>
                    <FaCheckCircle className='' />
                    <h1>
                        Lecture : {indx + 1}
                    </h1>
                    <IoDocumentOutline />
                    <h1>
                        {title}
                    </h1>

                    <div className='gap-2 flex opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-100 cursor-pointer ml-2 py-4'>
                        <MdEdit onClick={""} />
                        <MdDelete onClick={handleDeleteLecture} />
                    </div>




                </div>

                <div className='ml-auto flex items-center space-x-2'>

                    {
                        addContentActive ? (
                            <div className='bg-white border-t px-2 pt-1  border-x border-black flex relative top-2.5 cursor-text'>

                                <h1 className='font-bold text-[15px] '>
                                    Select content type
                                </h1>
                                <GoPlus onClick={() => setAddContentActive(false)} className='size-6 rotate-45 m-auto cursor-pointer fill-slate-800 hover:fill-black transition-all duration-150' />

                            </div>
                        ) : (
                            <>
                                <button onClick={() => setAddContentActive(true)} className='flex items-center space-x-2  border border-black px-3 py-2 hover:bg-[#E3E7EA]'>
                                    <FiPlus className='size-5' />
                                    <h1 className='font-bold text-sm'>Content</h1>
                                </button>
                                <button><RiArrowDownSLine className='size-6' /></button>
                            </>
                        )
                    }

                    <GiHamburgerMenu className='opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-100' />

                </div>
                
            </div>

            {/* add lecture content box */}

            {
                addContentActive && (
                    <div className='h-28 w-full border-t border-black py-2'>
                        <h3 className='text-center text-sm'>
                            Select the main type of content. Files and links can be added as resources.{" "}
                            <Link className='link link-primary'>Learn about content types.</Link>
                        </h3>

                        <div className='flex gap-5 py-3 h-'>

                            <div className='m-auto'></div>

                            <ContentTypeBox title={"Video"} Icon={IoIosPlayCircle}/>

                            <ContentTypeBox title={"Article"} Icon={IoMdDocument}/>

                            <ContentTypeBox title={"X"} Icon={GiCrossMark}/>

                            <div className='m-auto'></div>

                        </div>

                    </div>

                )
            }


        </div>
    )
}

export default Lecture;
