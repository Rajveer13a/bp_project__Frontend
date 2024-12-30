import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineReload } from "react-icons/ai";
import { FaCheckCircle, FaItalic } from 'react-icons/fa'
import { FcApproval } from 'react-icons/fc';
import { GrPowerReset } from 'react-icons/gr';
import { IoIosArrowDown, IoIosCloudDone, IoMdDoneAll } from 'react-icons/io'
import { MdCancel, MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdInfo, MdList } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { courseDetails, updateCourseDetails, updatethumbnail_promo } from '@/Redux/Slices/Instructor/InstructorSlice'
import { setFeedbackMessage } from '@/Redux/Slices/Management/ManagementSlice';

const Input = ({ onChange, value, name, count }) => {



    return (
        <div className='relative'>
            <input name={name} onChange={onChange} className='pointer-events-none opacity-85 border border-black w-[100%] h-[45px] outline-none pl-4 pr-20 placeholder:text-slate-600' placeholder={`Insert your course ${name}`} value={value}></input>

            <h1 className='absolute top-3 right-5'>{count - value?.length}</h1>

        </div>
    )

}


export const Review = ({ holder }) => {

    const dispatch = useDispatch();

    const { flag, value } = useSelector((state) => state.management.feedback.message[holder])

    const [approve, setApprove] = useState(flag);

    const [feedback, setFeedback] = useState(value);

    const [data, setData] = useState("")

    const onReset = () => {
        setApprove(null); setFeedback(""); setData("");

        dispatch(setFeedbackMessage({
            flag: null,
            value: "",
            name: holder
        }))
    }

    const onApprove = () => {

        setApprove(true);

        dispatch(setFeedbackMessage({
            name: holder,
            value: "",
            flag: true
        }))
    }

    const onDisapprove = () => {
        setFeedback(data);

        dispatch(setFeedbackMessage({
            name: holder,
            value: data,
            flag: false
        }))

    }

    return (
        <>
            {
                approve == null && !feedback && (
                    <div className='  flex  items-center space-x-4'>
                        <button onClick={onApprove} title='approve lecture' className=' group p-3'>
                            <FaCheckCircle className='text-4xl fill-blue-500 group-hover:scale-125 group-hover:fill-blue-600 transition-all duration-300  ' />
                        </button>

                        <button onClick={() => setApprove(false)} title='disapprove lecture' className='group p-3 '>
                            <MdCancel className='size-10 fill-red-500 group-hover:scale-125 group-hover:fill-red-600 transition-all duration-300 ' />
                        </button>
                    </div>
                )
            }
            <button onClick={onReset} title='Reset' className='absolute  right-36 top-10 group'>
                <GrPowerReset className='size-6 group-hover:rotate-12 transition-all duration-500' />
            </button>

            {
                approve ? (
                    <div className='  flex  items-center space-x-4 relative'>

                        <FcApproval className='fill-stone-400 size-8 ' />

                    </div>

                ) : (
                    ""
                )
            }

            {
                approve == false && !feedback && (
                    <div className='absolute top-11 space-x-8 flex '>
                        <textarea style={{ overflowY: 'hidden' }} value={data} onChange={(e) => {
                            setData(e.target.value); const textarea = e.target;
                            textarea.style.height = 'auto';
                            textarea.style.height = `${textarea.scrollHeight}px`;
                        }} className=' border border-black outline-none h-14 px-3 py-1 w-80 resize-none bg-white z-50' name="" id=""></textarea>
                        <button onClick={onDisapprove} className='font-semibold bg-blue-500 text-white h-full border px-4 hover:bg-blue-600 duration-100 border-black hover:scale-110'>Add</button>
                    </div>
                )
            }

            {
                feedback && (
                    <div className='absolute top-11 space-x-8 flex items-center '>
                        <div className='border border-dashed border-black outline-none overflow-y-scroll max-h-24  px-3 py-1 w-80 resize-none bg-white' name="" id="">{feedback}</div>

                    </div>
                )
            }

        </>
    )
}



function LandingPageReview() {

    const data = useSelector((state) => state.management.feedback.landingpage);

    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [data.description]);



    return (
        <div className='w-[96%]'>

            <div className='flex items-center '>
                <h1 className='font-semibold text-2xl border-b  pb-6 px-12'>
                    Course landing page
                </h1>

                <div className='w-[60%] pb-6  '>
                    <Review holder={"landing"} />
                </div>

            </div>
            <div className='px-12 space-y-6 py-8'>

                <p className=''>
                    Your course landing page is crucial to your success on Brainy. If it’s done right, it can also help you gain visibility in search engines like Google. As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course. Learn more about <Link className='link-primary underline'>creating your course landing page</Link> and <Link className='link-primary underline'>course title standards.</Link>
                </p>

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course title</h1>
                    <Input name={"title"} value={data.title} count={60} />
                    <p className='text-xs'>Your title should be a mix of attention-grabbing, informative, and optimized for search</p>
                </div>

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course subtitle</h1>
                    <Input name={"subtitle"} value={data.subtitle} count={120} />
                    <p className='text-xs'>Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you've covered during your course.</p>
                </div>

                {/* description */}

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course description</h1>

                    <div>
                        <div className='w-[100%] border-x border-t border-black flex items-center text-xl px-2 py-2 gap-4'>
                            <button>
                                <MdFormatBold />
                            </button>

                            <button>
                                <MdFormatItalic />
                            </button>

                            <button>
                                <MdFormatListNumbered />
                            </button>

                            <button>
                                <MdFormatListBulleted />
                            </button>
                        </div>

                        <textarea
                            ref={textAreaRef}
                            name="description"

                            className='pointer-events-none opacity-85 border border-black w-[100%]  outline-none pl-4 pr-20 placeholder:text-slate-600 overflow-hidden resize-none h-auto py-2'
                            placeholder={`Insert your course description`}
                            value={data.description}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                        ></textarea>
                        <p className='text-xs'>Description should have minimum 200 words.</p>



                    </div>

                </div>

                {/* basic info */}
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Basic info</h1>

                    <div className='flex justify-between pb-1'>
                        {/* Language Select */}
                        <div className='group relative'>
                            <select

                                value={data?.language}
                                name="language"
                                className="pointer-events-none opacity-85 border border-black w-[250px] h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer">
                                <option value="" >Select a language</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="mandarin">Mandarin</option>
                                <option value="hindi">Hindi</option>
                                <option value="french">French</option>
                                <option value="arabic">Arabic</option>
                                <option value="bengali">Bengali</option>
                                <option value="portuguese">Portuguese</option>
                                <option value="russian">Russian</option>
                            </select>
                            <div className='w-[250px] h-11 px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0 '></div>
                            <div className='absolute right-3 top-4'>
                                <IoIosArrowDown />
                            </div>
                        </div>

                        {/* Level Select */}
                        <div className='group relative'>
                            <select
                                value={data?.level}
                                name="level"
                                className="pointer-events-none opacity-85 border border-black w-[250px] h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer">
                                <option value="" selected>--Select Level--</option>
                                <option value="beginner">Beginner Level</option>
                                <option value="intermediate">Intermediate Level</option>
                                <option value="expert">Expert Level</option>
                                <option value="all">All Level</option>
                            </select>
                            <div className='w-[250px] h-11 px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                            <div className='absolute right-3 top-4'>
                                <IoIosArrowDown />
                            </div>
                        </div>

                        {/* Category Select */}
                        <div className='group relative'>
                            <select
                                value={data?.category}
                                name="category"
                                className="pointer-events-none opacity-85 border border-black w-[250px] h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer">
                                <option value="" selected>--Select Category--</option>
                                <option value="music">Music</option>
                                <option value="development">Development</option>
                                <option value="business">Business</option>
                                <option value="finance">Finance</option>
                                <option value="accounting">Accounting</option>
                                <option value="it-software">IT & Software</option>
                                <option value="office-productivity">Office Productivity</option>
                                <option value="personal-development">Personal Development</option>
                                <option value="design">Design</option>
                                <option value="marketing">Marketing</option>
                                <option value="lifestyle">Lifestyle</option>
                                <option value="photography-video">Photography & Video</option>
                                <option value="health-fitness">Health & Fitness</option>
                                <option value="teaching-academics">Teaching & Academics</option>
                            </select>
                            <div className='w-[250px] h-11 px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                            <div className='absolute right-3 top-4'>
                                <IoIosArrowDown />
                            </div>
                        </div>
                    </div>

                    {/* Subcategory Select */}
                    <div className='flex'>
                        <div className='group relative ml-auto'>
                            <select
                                name="subcategory"
                                className="border border-black w-[250px] h-11 px-4 outline-none appearance-none bg-transparent relative z-10 cursor-pointer pointer-events-none">
                                <option value="" selected>--Select Subcategory--</option>
                            </select>
                            <div className='w-[250px] h-11 px-4 absolute group-hover:bg-[#E3E7EA] top-0 -z-0'></div>
                            <div className='absolute right-3 top-4'>
                                <IoIosArrowDown />
                            </div>
                        </div>
                    </div>
                </div>

                {/* taught what */}
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg flex items-center gap-2'>What is primarily taught in your course? <MdInfo className='size-5 cursor-pointer' /></h1>

                    <input className='border border-black h-11 w-[50%] outline-none px-4 placeholder:text-slate-500' placeholder='e.g. Landscape Photography' type="text" />

                </div>

                {/* coure image upload */}

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course image</h1>

                    <div className='flex gap-4'>
                        <img className='size-[50%] border border-slate-300' src={data?.thumbnail?.secure_url || "https://s.udemycdn.com/course/750x422/placeholder.jpg"} alt="" />

                        <div className='space-y-2 w-[50%]'>
                            <h1>
                                Upload your course image here. It must meet our <span className='link-primary underline cursor-pointer'>course image quality standards</span> to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</h1>

                        </div>
                    </div>

                </div>

                {/* course promotional video */}

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Promotional video</h1>

                    <div className='flex gap-4'>

                        {
                            data?.trailerVideo ? (
                                <video className='size-[50%]' controls src={data?.trailerVideo?.secure_url}></video>
                            ) : (
                                <img className='size-[50%] border border-slate-300' src="https://s.udemycdn.com/course/750x422/placeholder.jpg" alt="" />
                            )
                        }

                        <div className='space-y-2 w-[50%]'>
                            <h1>
                                Your promo video is a quick and compelling way for students to preview what they’ll learn in your course. Students considering your course are more likely to enroll if your promo video is well-made.<span className='link-primary underline cursor-pointer'> Learn how to make your promo video awesome!</span> </h1>


                        </div>
                    </div>

                </div>


            </div>


        </div>
    )
}



export default LandingPageReview
