import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { TiDocumentText } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Logo from '@/components/Logo'
import { createCourse } from '@/Redux/Slices/Instructor/InstructorSlice';

function CourseCreate() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { num } = useParams();

    const [step, setStep] = useState(1);

    const [data, setData] = useState({
        type: "",
        title: "",
        category:"",
        timeSpend: ""
    });
    
    let flag;
    switch (step) {
        case 1:
            flag =  data?.type?.length !=0
            break;
    
        case 2 :
            flag =  data?.title?.length !=0
            break;
        case 3 :
            flag = data?.category?.length !=0
            break
        case 4 : 
            flag = data?.timeSpend?.length !=0
            break
    }


    async function onCreateCourse(){
        const res = await dispatch(createCourse({title: data.title, category: data.category}));

        if(res?.payload?.success){
            navigate("/instructor/course/manage/")
        }


    }

    function handleUserInput(e){
        
        
        const { value, name } = e.target ;

        setData( {...data , [name] : value} )
    }

    const category = ["Choose a category", "Music", "Development", "Business", "Finance", "Accounting", "IT & Software", "Office Productivity", "Personal Development", "Design", "Marketing", "Lifestyle", "Photography & Video", "Health & Fitness", "Teaching & Academics", "I don't know yet"];

    const timeSpend = ["I'm very busy right now (0-2 hours)", "I'll work on this on the side (2-4 hours)", "I have lots of flexibilty (5+hours)", "I haven't yet decided if I have time"]


    return (
        <div>
            {/* head */}
            <div className='flex border-b-4 px-6 items-center fixed bg-white w-full z-10'>


                <div className='pointer-events-none'>
                    <Logo />
                </div>

                <h1 className='text-xl ml-6  py-6 border-l-2 pl-6'>
                    Step {step} of 4
                </h1>


                <Link to={'/instructor/courses'} className='text-blue-700 hover:text-blue-800 duration-100 font-bold text-lg ml-auto mr-6 '>
                Exit
                </Link>

                <div className={`h-1 w-[${step * 25}%] transition-all duration-300  bg-blue-700 absolute left-0 -bottom-1 `}></div>

            </div>

            {/* body */}
            <div className='h-[70vh] relative top-20'>

                {
                    step == 1 && (
                        <div className='px-14 pt-10 space-y-12 '>

                            <h1 className='text-4xl font-semibold text-center '>
                                First, let's find out what type of course you're making.
                            </h1>

                            <div className='flex justify-center space-x-10'>

                                <div name={'type'} onClick={() => setData({...data,type:1})} className={`${data?.type == 1 ? " border-black " : "outline outline-2 outline-[#e5e7eb] border-transparent"} border-4 w-64 p-8 py-10 text-center space-y-1 hover:bg-[#E3E7EA] cursor-pointer`}>

                                    <MdOutlineOndemandVideo className='size-8 m-auto mb-2 ' />

                                    <h4 className='font-bold'>Course</h4>
                                    <p className='pb-9 '>
                                        Create rich learning experiences with the help of video lectures, quizzes, coding exercises, etc.
                                    </p>

                                </div>

                                <div name={'type'} onClick={() => setData({...data,type:2})}  className={`${data?.type == 2 ? " border-black " : "outline outline-2 outline-[#e5e7eb] border-transparent"} border-4 w-64 p-8 py-10 text-center space-y-1 hover:bg-[#E3E7EA] cursor-pointer`}>

                                    <TiDocumentText className='size-8 m-auto mb-2 ' />

                                    <h4 className='font-bold'>Practice Test</h4>
                                    <p className='pb-9 '>
                                        Help students prepare for cerificatiion exams by providing practice questions.
                                    </p>

                                </div>

                            </div>

                        </div>
                    )
                }

                {
                    step == 2 && (
                        <div className='px-14 pt-14 space-y-12 text-center '>

                            <div className='space-y-8'>
                                <h1 className='text-4xl font-semibold'>
                                    How about a working title?
                                </h1>
                                <h4 className=''>
                                    It's ok if you can't think of a good title now. You can change it later.
                                </h4>
                            </div>

                            <div className='pt-4 pb-36 relative w-fit m-auto'>

                                <input name='title' onChange={handleUserInput} className='border border-black focus:outline-none h-10 w-[48vw] px-4 py-6 placeholder:text-slate-600' type="text" placeholder='e.g. Learn Photoshop CS6 from Scratch' maxLength={60} value={data.title} />

                                <h3 className='absolute top-7 right-5 '>
                                    {60 - (data.title?.length || 0)}
                                </h3>
                            </div>

                        </div>
                    )
                }

                {
                    step == 3 && (
                        <div className='px-14 pt-14 space-y-12 text-center '>

                            <div className='space-y-8'>
                                <h1 className='text-4xl font-semibold'>
                                    What category best fits the knowledge you'll share?
                                </h1>
                                <h4 className=''>
                                    If you're not sure about the right category, you can change it later.

                                </h4>
                            </div>

                            <div className='pt-4 pb-36 relative w-fit m-auto z-10'>

                                <div className='group'>
                                    <select value={data?.category} name='category' onChange={handleUserInput} className='border border-black focus:outline-none h-12 w-[48vw] px-4 appearance-none bg-transparent '>

                                        {category.map((value, indx) => <option key={indx}> {value} </option>)}

                                    </select>

                                    <div className='h-12 w-[48vw] px-4 absolute group-hover:bg-[#E3E7EA] top-4 -z-10'></div>
                                </div>

                                <div className='absolute right-4 top-8'>
                                    <IoIosArrowDown />
                                </div>


                            </div>

                        </div>

                    )
                }

                {
                    step == 4 && (
                        <div className='px-14 pt-14 space-y-12 text-center '>

                            <div className='space-y-8'>
                                <h1 className='text-4xl font-semibold'>
                                    How much time can you spend creating your course per week?
                                </h1>
                                <h4 className=''>
                                    There's no wrong answer. We can help you achieve your goals even if you don't have much time.

                                </h4>
                            </div>

                            <div className='pt-4 pb-36 relative w-fit m-auto space-y-4 '>

                                {
                                    timeSpend.map((value, indx) => {
                                        return (
                                            <label onChange={handleUserInput} key={indx} className='py-3 w-[44vw] px-4 border border-black text-left space-x-6 flex items-center hover:bg-[#E3E7EA] duration-100 cursor-pointer'>

                                                <input checked={data?.timeSpend==indx+1 ? true : false} className='radio radio-sm border-2 border-black' id='option1' type="radio" name='timeSpend' value={indx+1} />

                                                <h1 className='font-bold '>
                                                    {value}
                                                </h1>

                                            </label>
                                        )
                                    })
                                }


                            </div>

                        </div>

                    )
                }


            </div>


            {/* foot */}
            <div className='flex border-t-2 shadow-2xl py-4 px-6 justify-between mt-4 fixed bottom-0 w-[100vw] z-10 bg-white'>

                {step != 1 && (
                    <Link onClick={() => setStep(step - 1)} to={`/instructor/course/create/${step - 1}`} >
                        <div className='font-bold bg-transparent text-black px-3 py-3 text-base border border-black'>
                            Previous
                        </div>
                    </Link>
                )}

                {
                    step < 4 ? (
                        <Link onClick={() =>{ 
                            flag ? setStep(step + 1) : null
                            
                        }} to={flag ? `/instructor/course/create/${step + 1}` : ""}>
                            <div className={`font-bold bg-[#2D2F31] text-white px-3 py-3 text-base ${flag   ? "" : "cursor-not-allowed  bg-[#969798]"  }`} >
                                Continue
                            </div>
                        </Link>
                    ) : (
                        <Link onClick={onCreateCourse}  >
                            <div className={`font-bold bg-[#2D2F31] text-white px-3 py-3 text-base ${flag   ? "" : "cursor-not-allowed  bg-[#969798]"  }`}>
                                Create Course
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default CourseCreate
