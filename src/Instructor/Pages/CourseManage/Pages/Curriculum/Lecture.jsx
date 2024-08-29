import { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { GiCrossMark, GiHamburgerMenu } from 'react-icons/gi';
import { GoPlus } from 'react-icons/go';
import { IoIosPlayCircle, IoMdDocument } from 'react-icons/io';
import { IoDocumentOutline } from 'react-icons/io5';
import { MdDelete, MdEdit, MdErrorOutline } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import axiosInstance from '@/Helpers/axiosInstance';
import { deleteLecture, } from '@/Redux/Slices/Instructor/InstructorSlice';

import ContentTypeBox from './ContentTypeBox';
// import formattedDate from './helperGetDate';

function Lecture({ indx, title, onDeleteRequest, lecture_id }) {
    const dispatch = useDispatch();

    const handleDeleteLecture = () => {
        const thunk = () => {
            dispatch(deleteLecture(lecture_id));
        }

        onDeleteRequest(thunk);
    }

    const [addvideoActive, setAddVideoActive] = useState(false);

    const [addContentActive, setAddContentActive] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }
    };


    const [uploadProgress, setUploadProgress] = useState({
        progress: 0,
        status: null, // or 'loading', 'succeeded', 'failed'
        error: null
    })


    let controllerRef = useRef(null);
    console.log(uploadProgress);

    const onUploadVideo = async () => {

        try {
            toast.error("brrr")
            setUploadProgress({
                progress: 0,
                status: null, 
                error: null
            })

            controllerRef.current = new AbortController();

            const formData = new FormData();


            formData.append('lectureVideo', selectedFile);

            const res = await axiosInstance.post(`/course/lectureVideo/${lecture_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress((prevstate) => ({
                        ...prevstate, progress: percentCompleted, status: "uploading"
                    }))


                },
                signal: controllerRef.current.signal
            });

            setUploadProgress((prevstate) => ({
                ...prevstate, status: "succeeded"
            }))

            return res.data;

        } catch (error) {
            toast.error(error.response.data.message);
            setUploadProgress({
                error: error.response.data.message, progress: 0, status: "failed"
            })

        }


    }

    const onAbortUplaod = () => {
        controllerRef.current.abort();
        setUploadProgress({
            progress: 0,
            status: null,
            error: null
        })
    }


    //get current date
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB');


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

                                {
                                    addvideoActive ? (
                                        <h1 className='font-bold text-[15px] '>
                                            Add Video
                                        </h1>) :
                                        (
                                            <h1 className='font-bold text-[15px] '>
                                                Select content type
                                            </h1>
                                        )
                                }

                                <GoPlus onClick={() => {
                                    setAddContentActive(false);
                                    setAddVideoActive(false);
                                    setSelectedFile(null);
                                    setFileName("No file selected");
                                    setUploadProgress({
                                        progress: 0,
                                        status: null,
                                        error: null
                                    })
                                }}
                                    className='size-6 rotate-45 m-auto cursor-pointer fill-slate-800 hover:fill-black transition-all duration-150'
                                />

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
                (addContentActive && !addvideoActive) && (
                    <div className='h-28 w-full border-t border-black py-2'>
                        <h3 className='text-center text-sm'>
                            Select the main type of content. Files and links can be added as resources.{" "}
                            <Link className='link link-primary'>Learn about content types.</Link>
                        </h3>

                        <div className='flex gap-5 py-3 h-'>

                            <div className='m-auto'></div>

                            <button onClick={() => setAddVideoActive(true)}>
                                <ContentTypeBox title={"Video"} Icon={IoIosPlayCircle} />
                            </button>

                            <ContentTypeBox title={"Article"} Icon={IoMdDocument} />

                            <ContentTypeBox title={"X"} Icon={GiCrossMark} />

                            <div className='m-auto'></div>

                        </div>

                    </div>

                )
            }

            {/* add video box */}

            {

                addvideoActive && (
                    <div className='border-t border-black  p-2'>

                        <div className='my-2 '>
                            <h1 className='font-bold '>
                                Upload Video
                            </h1>

                            <div className='relative'>
                                <div className='bg-[#D9DEE2] h-[1px] w-full my-3'></div>
                                <div className='bg-[#2D2F31] h-[2px] w-[15%] absolute top-0 left-0'></div>
                            </div>

                        </div>


                        {/* ...input video */}

                        {
                            !selectedFile && (
                                <div>
                                    <label htmlFor="inputvideo">
                                        <div className='flex  border border-black cursor-pointer'>
                                            <div className='w-[85%] border-r border-black text-cen bg-[#F7F9FA] p-2.5'>
                                                {fileName}
                                            </div>

                                            <div className='font-bold bg-white w-[15%]  hover:bg-[#E3E7EA] flex items-center justify-center'>
                                                Select Video
                                            </div>

                                        </div>
                                    </label>

                                    <input onChange={handleFileChange} type="file" id='inputvideo' accept="video/*" className='hidden' />


                                    <h1 className='text-xs text-slate-700 mt-2 mb-1'>
                                        <span className='font-semibold'>Note: </span>All files should be at least 720p and less than 4.0 GB.
                                    </h1>
                                </div>
                            )
                        }

                        {
                            selectedFile && (
                                <div>

                                    <div className='flex '>

                                        <div className='w-80 border-b border-slate-300'>
                                            <h1 className='font-bold border-b border-slate-300 pb-2 pr-4'>Filename</h1>
                                            <div className='py-1 h-20 overflow-hidden  w-72 '>
                                                <h2 className='py-1 text-wrap break-words'>
                                                    {fileName}
                                                </h2>
                                            </div>
                                        </div>


                                        <div className=' w- border-b border-slate-300 w-20'>
                                            <h1 className='font-bold  border-b border-slate-300 pb-2 '>Type</h1>
                                            <div className='py-1 h-20 flex items-center'>
                                                <h2 className=''>
                                                    Video
                                                </h2>
                                            </div>
                                        </div>

                                        <div className=' w border-b border-slate-300 w-40'>
                                            <h1 className='font-bold  border-b border-slate-300 pb-2'>Status</h1>
                                            <h2 className='py-1 flex items-center  gap-2 h-20'>

                                                {
                                                    !uploadProgress.error && (
                                                        <div className='relative w-24'>
                                                            <div className='h-2 bg-slate-200'></div>
                                                            <div
                                                                className='absolute h-2 bg-blue-700 top-0'
                                                                style={{ width: `${uploadProgress.progress}%`, transition: 'width 0.3s ease-in-out' }}
                                                            ></div>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    uploadProgress.error && (
                                                        <div className='flex items-center gap-1'>
                                                            <h1>
                                                                {uploadProgress.error}

                                                            </h1>
                                                            <MdErrorOutline className=' fill-red-600 mt-1' />
                                                        </div>
                                                    )
                                                }


                                                {!uploadProgress.error && <h4 className='text-sm'>{uploadProgress.progress}%</h4>}

                                            </h2>
                                        </div>

                                        <div className=' w border-b border-slate-300 w-40'>
                                            <h1 className='font-bold  border-b border-slate-300 pb-2'>Date</h1>
                                            <div className='py-1 h-20 flex items-center'>
                                                <h2 >
                                                    {formattedDate}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className='flex-grow border-b border-slate-300'>
                                            <h1 className='font-bold  border-b border-slate-300 pb-2'>
                                                Action
                                            </h1>
                                            <div className='py-1 h-20 flex items-center'>
                                                {
                                                    !uploadProgress.status && (
                                                        <button onClick={onUploadVideo} className='bg-blue-600 text-white py-1 px-3 font-semibold text-sm hover:bg-blue-700 duration-200 '>Upload</button>
                                                    )
                                                }

                                                {
                                                    uploadProgress.status == 'uploading' && (
                                                        <button onClick={onAbortUplaod}>
                                                            <GoPlus className='rotate-45 size-6' />
                                                        </button>
                                                    )
                                                }

                                                {
                                                    uploadProgress.status == "succeeded" && "completed"
                                                }

                                                {
                                                    uploadProgress.error && <button onClick={onUploadVideo} className='bg-red-400 text-white py-1 px-3 font-semibold text-sm hover:bg-blue-700 duration-200 '>Retry</button>
                                                }

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )
                        }




                    </div>

                )
            }


        </div>
    )
}

export default Lecture;
