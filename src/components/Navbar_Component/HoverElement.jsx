import React, { useEffect, useState } from 'react'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { LuHeart } from 'react-icons/lu';
import { MdOutlineNotificationsNone, MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { mylearning } from '@/Redux/Slices/CourseSlice';
import { updateCart, updateFavourite } from '@/Redux/Slices/UserConfigSlice';

function HoverElement({ text, children }) {

    const [hover, setHover] = useState(false);

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='py-5 px-3 relative cursor-pointer group'>
            <h1 className='group-hover:text-blue-600'>{text}</h1>

            <div className={`absolute right-0 top-[55px] opacity-0 pointer-events-none  pt-2 ${hover && "opacity-100 pointer-events-auto"} duration-150 transition-all z-30`}>
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
                    Get your team access to over 27,000 top Brainy courses, anytime, anywhere.
                </h1>
                <button className='bg-slate-800 text-white  py-3 w-full font-bold hover:bg-slate-700 duration-100 transition-all'>
                    Try Brainy Business
                </button>
            </div>
        </HoverElement>
    )
}

export const MyLearningButton = () => {

    const dispatch = useDispatch()

    const data = useSelector((state) => state?.course?.mylearning);

    useEffect(() => {

        dispatch(mylearning());

    }, [])

    return (
        <HoverElement text={"My learning"}>
            <div className='bg-white w-72  border-2 space-y-3 shadow-md flex flex-col  pb-3'>

                {
                    data && <>
                        <div className='max-h-80 overflow-y-scroll scroll'>
                            {
                                data?.map((value, indx) => {

                                    const completed = value.progress?.completed?.reduce((acc, sec) => {
                                        return acc + (sec?.reduce((sum, lec) => sum + (lec ? 1 : 0), 0) || 0);
                                    }, 0) || 0;

                                    const total = value.progress?.completed?.reduce((acc, sec) => acc + sec.length, 0);

                                    return (
                                        <Link to={`/learn/lecture/${value?._id}`} key={indx}>
                                            <div className='flex gap-2 border-b mb-1 px-5 py-3 '>

                                                <img className='size-14 object-cover' src={value?.thumbnail?.secure_url} alt="" />

                                                <div className='font-bold text-sm'>
                                                    <h1 className=' line-clamp-2 h-10'>
                                                        {value?.title}

                                                    </h1>


                                                    {
                                                        total > 0 ? (
                                                            <div className='h-[8px] bg-slate-300 mt-4 relative'>

                                                                <div style={{
                                                                    width: `${(completed / total) * 100 || 0}%`
                                                                }} className='absolute h-full bg-blue-700'></div>
                                                            </div>
                                                        ) : (
                                                            <h2 className='link-primary'>Start learning</h2>
                                                        )
                                                    }


                                                </div>

                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>


                        <Link to={"/my-courses/learning"} className='bg-slate-800 text-white  py-3 w-[80%] font-bold hover:bg-slate-700 duration-100 transition-all mx-auto text-center '>
                            Go to My Learning
                        </Link>
                    </>
                }

                {
                    !data && <div className='pt-4 space-y-2'>
                        <h3 className='text-center text-slate-500'>Your list is empty.</h3>
                        <Link to={"/"} className='text-blue-700 hover:text-blue-900 duration-100 font-bold w-full  text-center block'>Explore courses</Link>
                    </div>
                }

            </div>
        </HoverElement>
    )
}

export const CartButton = () => {

    const { cart, total } = useSelector((state) => state.config);

    const element = <div className='relative'>
        <MdOutlineShoppingCart className='size-5' />
        {
            cart?.length != 0 && (
                <div className='bg-blue-600 absolute rounded-full text-white w-full h-full text-center flex items-center justify-center -top-3 -right-2 text-sm '> <h1>{cart?.length}</h1> </div>
            )
        }
    </div>


    return (
        <HoverElement text={element}>
            <div className='bg-white w-72  border-2 space-y-3 shadow-md flex flex-col  pb-3'>

                {/* <Link>
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
                </Link> */}

                {
                    cart?.length != 0 && (
                        <>
                            <div className='max-h-80 overflow-y-scroll scroll'>
                                {
                                    cart?.map((value, indx) => (
                                        <Link to={`/course/${value?._id}`} key={indx}>
                                            <div className='flex gap-2 border-b mb-1 px-5 py-3 '>

                                                <img className='size-14 object-cover' src={value?.thumbnail?.secure_url} alt="" />

                                                <div className='text-sm'>
                                                    <h1 className=' line-clamp-2 h-10 font-bold '>
                                                        {value?.title}

                                                    </h1>

                                                    <h2 className='text-xs'>{value?.instructor?.username}</h2>

                                                    <h2 className='font-bold text-base'>₹{value?.price}</h2>
                                                </div>

                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>

                            <h1 className='px-5 font-bold text-lg'>Total: ₹{total}</h1>

                            <Link className='w-[80%] mx-auto block' to={"/shoppingcart"}>
                                <button className='bg-slate-800 text-white  py-3 w-[100%] font-bold hover:bg-slate-700 duration-100 transition-all'>
                                    Go to Cart
                                </button>
                            </Link>
                        </>
                    )
                }

                {
                    cart.length == 0 && (
                        <div className='pt-4 space-y-2'>
                            <h3 className='text-center text-slate-500'>Your cart is empty.</h3>
                            <Link to={"/"} className='text-blue-700 hover:text-blue-900 duration-100 font-bold w-full  text-center block'>Keep shopping</Link>
                        </div>
                    )
                }

            </div>

        </HoverElement>
    )
}

export const FavouriteButton = () => {

    const dispatch = useDispatch();


    const { favourite } = useSelector((state) => state.config);

    const element = <div className='relative'>
        <LuHeart className='size-5' />
    </div>

    const addToCart = (data) => {

        dispatch(updateCart([
            {
                add: data?._id
            },
            data
        ]));

        dispatch(updateFavourite([
            {
                remove: data?._id
            },
            data
        ]));
    }




    return (
        <HoverElement text={element}>
            <div className='bg-white w-72  border-2 space-y-3 shadow-md flex flex-col  pb-3'>

                {/* <Link>
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
                </Link> */}

                {
                    favourite?.length != 0 && (
                        <>
                            <div className='max-h-80 overflow-y-scroll scroll'>
                                {
                                    favourite?.map((value, indx) => (
                                        <Link to={`/course/${value?._id}`} key={indx}>
                                            <div className=' border-b mb-1 px-5 py-3 '>

                                                <div className='flex gap-2'>
                                                    <img className='size-14 object-cover' src={value?.thumbnail?.secure_url} alt="" />

                                                    <div className='text-sm'>
                                                        <h1 className=' line-clamp-2 h-10 font-bold '>
                                                            {value?.title}

                                                        </h1>

                                                        <h2 className='text-xs'>{value?.instructor?.username}</h2>

                                                        <h2 className='font-bold text-'>₹{value?.price}</h2>


                                                    </div>
                                                </div>

                                                <button onClick={(e) => { e.preventDefault(); addToCart(value); }} className='border border-black w-full py-1 mt-2 hover:bg-[#E3E7EA] duration-100 font-bold'>Add to cart</button>

                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>

                            <Link className='w-[80%] mx-5 block' to={"/my-courses/wishlist"}>
                                <button className='bg-slate-800 text-white  py-3 w-[100%] font-bold hover:bg-slate-700 duration-100 transition-all'>
                                    Go to wishlist
                                </button>
                            </Link>
                        </>
                    )
                }

                {
                    favourite.length == 0 && (
                        <div className='pt-4 space-y-2'>
                            <h3 className='text-center text-slate-500'>Your wishlist is empty.</h3>
                            <Link to={"/"} className='text-blue-700 hover:text-blue-900 duration-100 font-bold w-full  text-center block'>Explore courses</Link>
                        </div>
                    )
                }

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
                    <Link to={""}><h4 className='text-blue-500 '>Settings</h4></Link>
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

export const InstructorButton = () => {

    return <Link to={"/instructor/courses"} className='hover:text-blue-600 py-5 px-3'>Instructor</Link>
}






export default HoverElement
