import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineWarning } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { updatePrice } from '@/Redux/Slices/Instructor/InstructorSlice';

function Price() {

    const dispatch = useDispatch();
    const stateData = useSelector((state) => state.instructor.edit);
    const instructor = useSelector((state) => state.instructor.data);

    const [price, setPrice] = useState(0);

    console.log(price);


    const onSave = () => {
        dispatch(updatePrice({
            course_id: stateData._id,
            price: Number(price)
        }))
    }

    useEffect(()=>{
        setPrice(stateData.price)
    },[stateData])

    return (
        <div className='w-[96%] min-h-[120vh]'>

            <h1 className='font-semibold text-2xl border-b  pb-6 px-12'>
                Pricing
            </h1>



            <div className='px-12 space-y-6 py-8'>

                {
                    !instructor?.profileCompleted?.status && (
                        <div className='bg-[#F3CA8C] p-4 flex gap-4 '>
                            <MdOutlineWarning className='size-8' />
                            <div>
                                <h1 className='font-bold'>Please finish your premium application</h1>
                                <h1 className='text-sm'>You'll be able to set your price once your payout method is approved.</h1>
                                <Link to={"/instructor/user/edit-instructor-info/"} className='font-bold text-sm text-white bg-slate-800 px-4 py-2 mt-4 hover:bg-slate-700 transition-all duration-100 block max-w-fit'>
                                    Complete the premium application
                                </Link>
                            </div>
                        </div>
                    )
                }

                <div className='space-y-2 w-[73%]'>
                    <h1 className='font-semibold text-lg '>Set a price for your course</h1>
                    <p>
                        Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests can not be free.
                    </p>

                </div>

                <div className='space-y-2 w-[73%]'>

                    <div className='flex w-full gap-4'>

                        <div className=' w-[14%] '>
                            <h1 className='font-semibold text-lg '>Currency</h1>

                            <div className='group relative '>
                                <select

                                    className="border border-black w-full  h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer">
                                    <option defaultChecked value="" >INR</option>

                                </select>
                                <div className=' h-11 w-full  px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                                <div className='absolute right-3 top-4'>
                                    <IoIosArrowDown />
                                </div>
                            </div>
                        </div>

                        <div className=' w-[26%] '>
                            <h1 className='font-semibold text-lg'>Price Tier</h1>

                            <div className='group relative '>
                                <select
                                value={price}
                                    onChange={(e) => setPrice(e.target.value)}

                                    className="border border-black w-full  h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer">

                                    {/* <option value={0}>Free</option> */}

                                    <option selected disabled > Select Tier</option>
                                    <option value={400}>₹400 (tier 1)</option>
                                    <option value={799}>₹799 (tier 2)</option>
                                    <option value={1199}>₹1,199 (tier 3)</option>
                                    <option value={1499}>₹1,499 (tier 4)</option>
                                    <option value={1699}>₹1,699 (tier 5)</option>
                                    <option value={1799}>₹1,799 (tier 6)</option>
                                    <option value={1999}>₹1,999 (tier 7)</option>
                                    <option value={2299}>₹2,299 (tier 8)</option>
                                    <option value={2499}>₹2,499 (tier 9)</option>
                                    <option value={2699}>₹2,699 (tier 10)</option>
                                    <option value={2799}>₹2,799 (tier 11)</option>
                                    <option value={2899}>₹2,899 (tier 12)</option>



                                </select>
                                <div className=' h-11 w-full  px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                                <div className='absolute right-3 top-4'>
                                    <IoIosArrowDown />
                                </div>
                            </div>
                        </div>




                    </div>

                </div>


                <button onClick={onSave} disabled={!instructor.profileCompleted} className={`font-bold  text-white px-6 py-3 mt-4  transition-all duration-100 bg-slate-800 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-[#6A6F73] `}>
                    Save
                </button>


            </div>


        </div>
    )
}

export default Price
