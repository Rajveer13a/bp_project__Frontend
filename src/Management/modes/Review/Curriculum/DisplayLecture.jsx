import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { IoDocumentOutline } from 'react-icons/io5'

import Lecture from './Lecture'



function DisplayLecture({ state ,section_indx }) {


    

    return (

        <div className='space-y-7'>
            {
                state.map((lecture, indx) => {
                    return (
                        <div key={indx} className=' bg-[#add8e62f] border border-black  mx-5 '>

                            {/* title */}
                            <div className='flex space-x-2 items-center border-b border-black p-3'>
                                <FaCheckCircle className='' />
                                <h1>
                                    Lecture : {indx + 1}
                                </h1>
                                <IoDocumentOutline />
                                <h1>
                                    {lecture?.title}
                                </h1>
                            </div>

                            {/* lecture content */}

                            <Lecture lecture={lecture} lecture_indx={indx} section_indx={section_indx}/>



                        </div>
                    )
                })
            }
        </div>

    )
}

export default DisplayLecture
