import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteCourse } from '@/Redux/Slices/Instructor/InstructorSlice';

function Settings({onDeleteRequest}) {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const course_id = useSelector((state)=> state?.instructor?.edit?._id);

    const handleDeleteSection = () => {
        const thunk = async() => {

            const res = await dispatch(deleteCourse({
                course_id
            }));

            if(res.payload){
                navigate("/instructor/courses")
            }

            

        };

        onDeleteRequest(thunk)
    }

    return (
        <div className='w-[96%]'>

            <h1 className='font-semibold text-2xl border-b  pb-6 px-12'>
                Settings
            </h1>

            <div className='px-12 space-y-6 py-8 border-b bo'>

                <h1 className='font-semibold text-lg'>
                    Course Status
                </h1>

                <p>
                    This course is not published on the Udemy marketplace.
                </p>

                <div className='flex gap-6 items-center'>

                    <button  className='h-8 w-52 border border-black font-semibold hover:cursor-not-allowed disabled opacity-50  '>Unpublished</button>
                    <p>New students cannot find your course via search, but existing students can still access content.</p>

                </div>

                <div className='flex gap-6 items-center'>

                    <button onClick={handleDeleteSection}  className='h-8 w-52 border border-black font-semibold hover:bg-[#E3E7EA] transition-all duration-100'>Delete</button>
                    <p>We promise students lifetime access, so courses cannot be deleted after students have enrolled.</p>

                </div>

            </div>


        </div>
    )
}

export default Settings
