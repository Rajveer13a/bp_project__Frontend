import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import axiosInstance from '@/Helpers/axiosInstance'
import HomeLayout from '@/Layouts/HomeLayout'
import { getUser } from '@/Redux/Slices/AuthSlice';

function TeachPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onGetStarted = async()=>{

        const res = await axiosInstance.post("/instructor/create");
        
        if(res.data.success){
            dispatch(getUser());
            navigate("/instructor/courses")
        }
    }

  return (
    <HomeLayout>

        <div className='relative flex items-center'>
            <div className='h-[80vh]'>
            <img className='h-full object-cover' src="https://s.udemycdn.com/teaching/billboard-desktop-2x-v4.jpg" alt="" />
            </div>
            <div className='absolute left-32 space-y-4 text-[#2D2F31] merriweather-light'>
                <h2 className='text-5xl font-semibold'>Come teach <br /> with us</h2>
                <h3 className='text-lg'>Become an instructor and change lives <br /> — including your own</h3>
                <button onClick={onGetStarted} className='text-white font-bold bg-slate-900 hover:bg-slate-800 duration-100 w-full py-3 rounded-md'>Get Started</button>
            </div>
        </div>

        <div className='text-[#2D2F31] py-14 space-y-14'>

            <h1 className='merriweather-bold text-4xl text-center'>So many reasons to start</h1>

            <div className='flex justify-between px-10'>

                <div className='w-80 flex flex-col items-center'>
                    <img className='size-24' src="https://s.udemycdn.com/teaching/value-prop-teach-2x-v3.jpg" alt="" />
                    <h2 className='font-bold text-center text-lg'>Teach your way</h2>
                    <p className='text-center'>
                    Publish the course you want, in the way you want, and always have control of your own content.
                    </p>
                </div>

                <div className='w-80 flex flex-col items-center'>
                    <img className='size-24' src="https://s.udemycdn.com/teaching/value-prop-inspire-2x-v3.jpg" alt="" />
                    <h2 className='font-bold text-center text-lg'>Inspire learners</h2>
                    <p className='text-center'>
                    Teach what you know and help learners explore their interests, gain new skills, and advance their careers.
                    </p>
                </div>

                <div className='w-80 flex flex-col items-center'>
                    <img className='size-24' src="https://s.udemycdn.com/teaching/value-prop-get-rewarded-2x-v3.jpg" alt="" />
                    <h2 className='font-bold text-center text-lg'>Get rewarded</h2>
                    <p className='text-center'>
                    Expand your professional network, build your expertise, and earn money on each paid enrollment.
                    </p>
                </div>

            </div>
 
        </div>

    </HomeLayout>
  )
}

export default TeachPage
