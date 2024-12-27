import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa6';
import { IoMdCheckmark } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { saveAndContinue } from '@/Redux/Slices/Instructor/InstructorSlice';

export function CustomCheckbox({className}) {
    const [isChecked, setIsChecked] = useState(false);

    return (

        <div className={`relative ${className}`}>
            <input
                required
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)} type='checkbox'
                className={`appearance-none  w-6 h-6 border-2 border-black cursor-pointer flex items-center justify-center ${isChecked ? 'bg-black' : 'bg-white'
                    }`}

            />
            {isChecked && <FaCheck onClick={() => setIsChecked(!isChecked)} className="text-white absolute top-1 right-1 cursor-pointer" />}

        </div>


    );
}

function Terms() {
    const dispatch = useDispatch();

    const onSave = (e)=>{
        e.preventDefault();
        dispatch(saveAndContinue())
    }

    return (
        <div className='flex'>

            <form onSubmit={onSave} action="">
                <div className='m-auto  w-[46%] space-y-4'>

                    <h1>When you sign up to become an instructor on the Brainy platform, you agree to abide by the <Link className='link-primary'>Instructor Terms.</Link></h1>
                    <p>They cover details about the Brainy platform that are relevant to instructors (including pricing, payments, and your obligations as an instructor), so it’s important to read them.</p>

                    <div className='space-x-2 flex'>

                        <CustomCheckbox />
                        <div>I have read and agree to the Brainy Instructor Terms.</div>

                    </div>

                    <div></div>

                    <button type='submit' className='bg-slate-800 text-white font-bold mt-8  px-3 py-3 hover:bg-slate-700 transition-all duration-100 '>Save and Continue</button>

                </div>
            </form>

        </div>
    )
}

export default Terms
