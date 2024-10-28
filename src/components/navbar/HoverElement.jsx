import React, { useState } from 'react'
import { MdOutlineNotificationsNone, MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

function HoverElement({ text, children }) {

    const [hover, setHover] = useState(false);

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='py-5 px-3 relative cursor-pointer group'>
            <h1 className='group-hover:text-blue-600'>{text}</h1>

            <div className={`absolute right-0 top-[62px] opacity-0 pointer-events-none  pt-1 ${hover && "opacity-100 pointer-events-auto"} duration-150 transition-all animate-in z-30`}>
                {/* <div className=' w-52 bg-white h-32'>

                </div> */}
                {children}

            </div>

        </div>
    )
}


export const BusinessButton = () => {
    return (
        <HoverElement text={"Brainy Business"}>
            <div className='bg-white w-72 py-3 px-5 border-2 space-y-3 shadow-md '>
                <h1 className='font-bold text-lg text-center leading-tight'>
                    Get your team access to over 27,000 top Udemy courses, anytime, anywhere.
                </h1>
                <button className='bg-slate-800 text-white  py-3 w-full font-bold hover:bg-slate-700 duration-100 transition-all'>
                    Try Udemy Business
                </button>
            </div>
        </HoverElement>
    )
}

export const MyLearningButton = () => {
    return (
        <HoverElement text={"My learning"}>
            <div className='bg-white w-72  border-2 space-y-3 shadow-md flex flex-col  pb-3'>

                <Link>
                    <div className='flex gap-2 border-b mb-1 px-5 py-3 '>

                        <img className='size-14 object-cover' src="https://img-c.udemycdn.com/course/240x135/4077322_a979_4.jpg" alt="" />

                        <div className='font-bold text-sm'>
                            <h1 className=' line-clamp-2 h-10'>
                                How to Create an Online Course: The Official Udemy Course

                            </h1>

                            <h2 className='link-primary'>Start learning</h2>
                        </div>

                    </div>
                </Link>

                <button className='bg-slate-800 text-white  py-3 w-[80%] font-bold hover:bg-slate-700 duration-100 transition-all mx-auto '>
                    Go to My Learning
                </button>
            </div>
        </HoverElement>
    )
}

export const CartButton = () => {

    const element = <div className='relative'>
        <MdOutlineShoppingCart className='size-5' />
        <div className='bg-blue-600 absolute rounded-full text-white w-full h-full text-center flex items-center justify-center -top-3 -right-2 text-sm'> <h1>5</h1> </div>
    </div>


    return (
        <HoverElement text={element}>
            <div className='bg-white w-72  border-2 space-y-3 shadow-md flex flex-col  pb-3'>

                <Link>
                    <div className='flex gap-2 border-b mb-1 px-5 py-3 '>

                        <img className='size-14 object-cover' src="https://img-c.udemycdn.com/course/240x135/4077322_a979_4.jpg" alt="" />

                        <div className='text-sm'>
                            <h1 className=' line-clamp-2 h-10 font-bold '>
                                How to Create an Online Course: The Official Udemy Course

                            </h1>

                            <h2 className='text-xs'>Crist King</h2>

                            <h2 className='font-bold text-base'>₹400</h2>
                        </div>

                    </div>
                </Link>

                <h1 className='px-5 font-bold text-lg'>Total: ₹400</h1>

                <button className='bg-slate-800 text-white  py-3 w-[80%] font-bold hover:bg-slate-700 duration-100 transition-all mx-auto '>
                    Go to Cart
                </button>
            </div>
        </HoverElement>
    )
}


export const NotifyButton = () => {

    const [active, setActive] = useState(0);

    return (
        <HoverElement text={<MdOutlineNotificationsNone className='size-6' />}>
            <div className='bg-white w-[340px]  border-2 space-y-3 shadow-md flex flex-col  pb-2'>

                <div className='flex justify-between px-5 pt-5  font-semibold'>
                    <h1 className='font-bold text-lg'>Notification</h1>
                    <Link to={"/settings"}><h4 className='text-blue-500 '>Settings</h4></Link>
                </div>

                <div>

                    <div className=' font-semibold flex pb-2 text-center'>
                        <h3 onClick={() => setActive(0)} className={`relative w-[50%]  ${active === 0 ? "current " : "cursor-pointer"}`}>Instuctor</h3>
                        <h3 onClick={() => setActive(1)} className={`relative w-[50%]  ${active === 1 ? "current" : "cursor-pointer"}`} > Student</h3>
                    </div>
                    <hr className=' border-[1.5px]' />

                    <div className='text-center py-2'>

                        No notifications.
                    </div>

                </div>
            </div>
        </HoverElement>
    )
}

export const InstructorButton = () =>{
    
    return <Link to={"/instructor/courses"} className='hover:text-blue-600 py-5 px-3'>Instructor</Link>
}



export default HoverElement
