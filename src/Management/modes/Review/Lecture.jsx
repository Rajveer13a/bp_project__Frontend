import React, { useState } from 'react'
import { FaCheckCircle, } from 'react-icons/fa';
import { FcApproval } from 'react-icons/fc';
import { GrPowerReset } from "react-icons/gr";
import { MdCancel, } from 'react-icons/md';
import { TiPointOfInterestOutline } from 'react-icons/ti';
import { VscDebugBreakpointData } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';

import { approveLecture, disapproveLecture, feedbackLecture } from '@/Redux/Slices/Management/ManagementSlice';

import VideoPlayer from './VideoPlayer'

function Lecture({ lecture, section_indx, lecture_indx }) {

    const dispatch = useDispatch();



    const [approve, setApprove] = useState(lecture.approved);

    const [feedback, setFeedback] = useState(lecture.feedback)

    const [data, setdata] = useState(lecture.feedback);

    const onApproveLecture = async() => {

        const res = await dispatch(feedbackLecture({
            lecture_id : lecture._id,
            flag : true
        }))

        if(res.payload){
            dispatch(approveLecture({
                lecture_indx,
                section_indx
            }))
            setApprove(true)
        }

        

    }

    const onDisapproveLecture = async() => {

        const res = await dispatch(feedbackLecture({
            lecture_id : lecture._id,
            flag : false,
            feedback : data
        }))        

        if(res.payload){

            dispatch(disapproveLecture({
                lecture_indx,
                section_indx,
                feedback: data
            }))

        }

        setFeedback(data)

        setApprove(false);

    }

    return (
        <div className='p-5 flex justify-between'>

            <VideoPlayer baseUrl={lecture.resource.secure_url} />



            {
                approve == false  && (
                    <div className='h-[220px] w-[40%] flex flex-col relative'>

                        <button onClick={() => {
                            setApprove(null);
                            setFeedback("")
                        }} title='Reset' className='absolute top-0 right-0 group'>
                            <GrPowerReset className='size-6 group-hover:rotate-12 transition-all duration-500' />
                        </button>

                       {
                        feedback=="" && approve == false ? (
                            <>
                            
                            <textarea onChange={(e) => setdata(e.target.value)} placeholder='write lecture feedback here..' className='w-[100%] h-[100px]   border border-info  focus:outline-none resize-none p-2 bg-[#f0f8ff8a] mt-auto placeholder:text-slate-600 ' value={data} name="" id="">
    
                            </textarea>
    
                            <button onClick={onDisapproveLecture} className=' bg-blue-500 text-white mb-auto font-semibold py-1 hover:bg-blue-600 transition-all duration-300'>Add</button>
                            </>
                        ): (
                            <h1 className='text-center text-xl m-auto flex items-center gap-2 '>
                                <TiPointOfInterestOutline className='' />
                                {lecture.feedback}
                            </h1>
                        )
                       }

                        


                    </div>

                )
            }

            

            {

                (approve == null ) && (
                    <div className='w-[40%] h-[220px] flex flex-col justify-center gap-2 '>


                        <h1 className='text-center text-2xl  font-semibold'>

                        </h1>

                        <div className='  flex justify-evenly items-center'>
                            <button title='approve lecture' onClick={onApproveLecture} className=' group p-3'>
                                <FaCheckCircle className='text-4xl fill-blue-500 group-hover:scale-125 group-hover:fill-blue-600 transition-all duration-300  ' />
                            </button>

                            <button title='disapprove lecture' onClick={() => setApprove(false)} className='group p-3 '>
                                <MdCancel className='size-10 fill-red-500 group-hover:scale-125 group-hover:fill-red-600 transition-all duration-300 ' />
                            </button>
                        </div>

                    </div>
                )
            }

            {
                approve == true  && (

                    <div className='my-auto flex items-center w-[40%] justify-center gap-3 relative  h-[220px]'>

                        <button onClick={() => setApprove(null)} title='Reset' className='absolute top-0 right-0 group'>
                            <GrPowerReset className='size-6 group-hover:rotate-12 transition-all duration-500' />
                        </button>

                        <h1 className='font-semibold text-2xl'>Approved</h1>

                        <FcApproval className='fill-stone-400 size-8 ' />
                    </div>

                )
            }




        </div>
    )
}

export default Lecture
