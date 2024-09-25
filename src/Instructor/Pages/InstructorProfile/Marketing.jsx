import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { saveAndContinue } from '@/Redux/Slices/Instructor/InstructorSlice';

import { CustomCheckbox } from './Terms'

function Marketing() {
    const dispatch = useDispatch();

    const onSave = (e)=>{
        e.preventDefault();
        dispatch(saveAndContinue())
    }

    return (
        <div className='flex'>

            <form onSubmit={onSave} action="">
                <div className='m-auto  w-[46%] space-y-4'>

                    <h1 className='font-bold text-xl'>Brainy’s Instructor Programs</h1>
                    <p>Brainy offers several instructor programs in which you can participate. These programs can help increase your revenue potential on Brainy  and do not require any up-front cost to participate. You can modify your participation status, though certain programs restrict when modifications can be made and have additional requirements on termination. Any changes you make will not apply to currently active campaigns.</p>

                    <h2 className='font-bold '>GenAI Program</h2>
                    <p>As part of the GenAI Program, you allow Brainy  to use your content in connection with generative AI models, and you get access to our generative AI-powered tools as specified in the <Link className='link-primary underline'>Instructor GenAI Policy</Link>. You will automatically be included in the GenAI Program unless you opt out during Brainy's designated annual periods. New instructors can opt out before the publication of their first course. To opt out, visit your <Link className='link-primary underline'>GenAI program page.</Link></p>
                    
                    <h2 className='font-bold '>Deals Program</h2>
                    <p>Participation in the Brainy  Deals Program can increase your revenue potential by enabling Brainy  to offer your content at a compelling discount via targeted promotions. It also allows Brainy  to optimize your list price in different markets.</p>

                    <div className='space-x-2 flex'>

                        <CustomCheckbox className={"transform scale-90"} />
                        <div>I have read and agree to the <Link className='link-primary underline'>Promotion Policy</Link>  Terms for the Brainy Deals program.</div>

                    </div>

                    <h2 className='font-bold '>Brainy Business Program</h2>
                    <p>By opting into the Brainy  Business Program, you give Brainy  the ability to select your content for inclusion in Brainy'ssubscription-based content collections featuring a select group of Brainy'stop content for professional and personal development skills . You also agree that, if your course is selected for inclusion, you will not begin to offer any equivalent on-demand content on any competitor site or platform other than your own.</p>

                    <div className='space-x-2 flex'>

                        <CustomCheckbox className={"transform scale-90"} />
                        <div>I have read and agree to the <Link className='link-primary underline'>Promotion Policy</Link>  Terms for the Brainy Business program.</div>

                    </div>

                    <h3 className='text-sm'>Note that your program selections above do not guarantee participation.</h3>

                    <div> </div>

                    <button type='submit' className='bg-slate-800 text-white font-bold mt-8  px-3 py-3 hover:bg-slate-700 transition-all duration-100 '>Save and Continue</button>

                </div>
            </form>

        </div>
    )
}

export default Marketing
