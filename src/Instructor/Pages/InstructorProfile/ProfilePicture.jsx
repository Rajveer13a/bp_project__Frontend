import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai';
import { IoMdDoneAll } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import { getUser, updateAvatar } from '@/Redux/Slices/AuthSlice';
import { instructorDetails } from '@/Redux/Slices/Instructor/InstructorSlice';

export const FileUpload = ({ type, name}) => {

    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState(null);

    const [fileName, setFileName] = useState("No file selected");

    const [uploadProgress, setUploadProgress] = useState({
        progress: 0,
        status: null, // or 'loading', 'succeeded', 'failed'
        error: null
    })

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }

        setUploadProgress({
            progress: 0,
            status: null, 
            error: null
        })
    };

    let controllerRef = useRef(null);

    const onFileUpload = async () => {
        if (!selectedFile) {
            return;
        }

        setUploadProgress({
            progress: 0,
            status: null, 
            error: null
        })


        controllerRef.current = new AbortController();

        const formdata = new FormData();

        formdata.append(name, selectedFile);

        const res = await dispatch(
            updateAvatar({
                file: formdata,
                setUploadProgress,
                signal: controllerRef.current.signal,
            })
        );

        if (res.payload) {

            dispatch(getUser());
            
            setUploadProgress({
                progress: 0,
                error: null,
                status: "succeeded"
            })
            // dispatch(courseDetails(course_id));
        }else{
            setUploadProgress({
                progress: 0,
                error: null,
                status: "failed"
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

    useEffect(()=>{
        onFileUpload();
    },[selectedFile])



    return (
        <>
            <div>
            <div className='h-12 border border-black flex items-center pl-3 bg-[#F7F9FA] cursor-pointer relative'>
                <label htmlFor={name} className='overflow-hidden text-ellipsis whitespace-nowrap w-[70%]' > {uploadProgress.status && uploadProgress.progress == 100 ? `processing ${name}...` : fileName || "No file selected"} </label>
                {
                    uploadProgress.status == null && (
                        <button onClick={onFileUpload} className='h-full w-[30%] border-l border-black ml-auto bg-white hover:bg-[#E3E7EA] font-bold transition-all duration-100' >Upload File </button>
                    )
                }

                {
                    uploadProgress.progress == 100 && !uploadProgress.error && (
                        <button className='h-full w-[30%] border-l border-black ml-auto bg-white hover:bg-[#E3E7EA] font-bold transition-all duration-100 flex' ><AiOutlineReload  className=' size-7  m-auto fill-blue-900  animate-spin' /> </button>
                    )
                }
                {
                    uploadProgress.status == "succeeded" && (
                        <button className='h-full w-[30%] border-l border-black ml-auto bg-white hover:bg-[#E3E7EA] font-bold transition-all duration-100 flex' ><IoMdDoneAll className=' size-8  m-auto fill-blue-800' /> </button>
                    )
                }
                {
                    uploadProgress.error && (
                        <button onClick={onFileUpload} className='h-full w-[30%] border-l border-black ml-auto bg-white hover:bg-[#E3E7EA] font-bold transition-all duration-100' > Retry </button>
                    )
                }

                {
                    uploadProgress.progress < 100 && uploadProgress.status == "uploading" && (
                        <button onClick={onAbortUplaod} className='h-full w-[30%] border-l border-black ml-auto bg-white hover:bg-[#E3E7EA] font-bold transition-all duration-100' >Cancel </button>
                    )
                }

                {
                    uploadProgress.progress < 100 && (
                        <label
                            htmlFor={name}
                            style={{ width: `${uploadProgress.progress == 0 ? 0 : uploadProgress.progress - 29}%`, transition: 'width 0.3s ease-in-out' }}
                            className='absolute bg-blue-600 h-[100%] left-0  flex items-center justify-center text-white'>
                            {uploadProgress.status && uploadProgress.progress} %
                        </label>
                    )
                }


            </div>
            <input name={name} onChange={handleFileChange} id={name} type="file" accept={`${type}/*`} hidden />
        </div>
        
        {
            uploadProgress.status && uploadProgress.progress == 100 && (
                <h1 className='text-sm font-semibold text-blue-800'>please wait , changes will reflect shortly.</h1>
            )
        }
        

        </>
    )
}

 

function ProfilePicture() {

    const dispatch = useDispatch();
    const currImage = useSelector((state)=>state?.auth?.data?.profileImage?.secure_url);
    
    const onContinue = ()=>{
        dispatch(instructorDetails())
    }
   
    return (
        <div className='flex'>
            <div className='m-auto space-y-3 w-[46%]'>
                <h1 className='font-bold'>
                    Image preview
                </h1>

                <div className='border border-black flex flex-col items-center py-4 px-8 gap-2'>
                    <img className='size-60' src={currImage || "https://img-c.udemycdn.com/user/200_H/anonymous_3.png"} alt="" />
                    <h3 className='text-xs'>Your image should be at minimum 200x200 pixels and maximum 6000x6000 pixels.</h3>
                </div>

                <h1 className='font-bold'>
                Add / Change Image
                </h1>

                {/* <label className='flex' htmlFor="profilePic">
                    <div className='border border-black w-[70%] py-3 px-4'>
                        No file selected
                    </div>
                    <button className='border-y border-r w-[30%] border-black hover:bg-[#E3E7EA] transition-all duration-100 font-bold'>Upload Image</button>
                </label> */}
                

                <FileUpload type={"Image"} name={"avatar"}  />

                <div></div>
                
                <button onClick={onContinue} className='bg-slate-800 text-white font-bold mt-8  px-3 py-3 hover:bg-slate-700 transition-all duration-100 '>Save and Continue</button>

                {/* <input onChange={handleImageChange} id='profilePic' type="file" hidden accept='Image/*' /> */}

                
                

            </div>
        </div>
    )
}

export default ProfilePicture
