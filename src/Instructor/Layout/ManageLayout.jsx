import React from 'react'
import { Link } from 'react-router-dom'

function ManageLayout({requirements, tips, title , card , resources}) {
    
    const {left, right } = card;
    

    return (
        <div>
            <h1 className='font-semibold text-2xl pl-12 border-b h-16'>{title}</h1>

            <div className='py-8 border bg-[#F7F9FA] pl-12 pr-5 space-x-6  flex items-center '>

                <div className='w-[545px] space-y-6 '>
                    <h1 className='font-bold text-2xl'>{left.heading}</h1>

                    <p className='text-xl'>{left.para}</p>
                </div>

                <div className='bg-white  flex flex-col items-center py-5 gap-5 shadow-lg border w-[35.5%]'>
                    <img className='w-[112px]' src={right.image} alt="" />

                    <h1 className='font-bold text-lg'>{right.heading}</h1>

                    <p className='w-[80%] text-center'>{right.para}</p>

                    <button className='border border-black font-bold px-4 py-3 mb-4'>{right.button}</button>

                </div>

            </div>

            <div className='pl-12  w-[87%] pt-10 space-y-6'>

                <h3 className='font-bold text-2xl'> Tips</h3>

                {
                    tips.map((value, indx) => (
                        <div key={indx} className='space-y-1' >
                            <h4 className='font-bold '>
                                {value.title}
                            </h4>
                            <p>
                                {value.content}
                            </p>
                        </div>
                    ))
                }

                <h1 className='font-bold text-[26px] pt-10'>Requirements</h1>

                <ul className='space-y-2'>
                    {requirements.map((value, indx)=>(
                        <li key={indx} className='list-disc ml-6'>{value}</li>
                    ))}
                </ul>
                
                <h1 className='font-bold text-[26px] '>Resources</h1>

                <ul className='space-y-4'>

                    {resources.map((value,indx)=>(
                        <li key={indx} className='space-y-1'>
                        <Link className='link text-blue-800  font-bold hover:text-blue-900'>{value.heading}</Link>
                        <p>{value.para}</p>
                    </li>
                    ))}                   
                
                </ul>

            </div>

        </div>
    )
}

export default ManageLayout
