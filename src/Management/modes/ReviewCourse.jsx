import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoMdCheckmark, IoMdSettings } from 'react-icons/io';
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useLocation, useNavigate, } from 'react-router-dom'

import Footer from '@/components/Footer';
import axiosInstance from '@/Helpers/axiosInstance';
import { addReviewData, reviewCourse } from '@/Redux/Slices/Management/ManagementSlice';

import GoalsReview from './GoalsReview';
import LandingPageReview from './LandingPageReview';
import DisplayCurriculum from './Review/Curriculum/DisplayCurriculum';




function ReviewCourse() {

    const location = useLocation();
    const state = location.state;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const data = useSelector((state) => state.management.feedback);


    const [checked, setChecked] = useState({
        "Intended learners": data.message.intended.flag != null,
        "Course landing page": data.message.landing.flag != null,
        "Curriculum": data.curr?.reduce((acc, curr) => {

            acc = acc && curr.lectures.some((value) => value.approved != null)
        }, true)
    });

    // console.log(checked["Intended learners"], checked["Course landing page"], checked["Curriculum"]);

    const [active, setActive] = useState("curriculum");


    let render;
    switch (active) {
        case "goals":
            render = <GoalsReview />
            break;

        case "curriculum":
            render = <DisplayCurriculum />
            break;

        case "basics":
            render = <LandingPageReview />
            break;

    }

    const sections = [
        {
            title: "TO Check",
            list: [

                { name: "Intended learners", active: "goals" },

                { name: "Course landing page", active: "basics" },

                { name: "Course messages", active: "messages" },

                { name: "Curriculum", active: "curriculum" },

                { name: "Captions (optional)", active: "captions" },

                { name: "Accessibility (optional)", active: "accessibility" },
            ]
        },



    ]

    const onCourseApprove = async () => {

        // for (let keys in checked) {
        //     if (checked[keys] == false) {
        //         return;
        //     }
        // }

        const res = await dispatch(reviewCourse({
            course_id: state._id,
            flag: true
        }));

        if (res.payload) {
            navigate("/management/mode/")
        }
    }

    const onCourseDisapprove = async () => {

        // for (let keys in checked) {
        //     if (checked[keys] == false) {
        //         return;
        //     }
        // }

        const res = await dispatch(reviewCourse({
            course_id: state._id,
            flag: false
        })
        );

        if (res.payload) {
            navigate("/management/mode/")
        }
    }

    // useEffect(() => {
    //     dispatch(addReviewData({ data: state }))
    // }, [])

    const [allowAction, setAllowAction] = useState(true);

    // for(let key in checked){
    //     if(checked[key]===false){
    //         setAllowAction(false);
    //         break;
    //     }
    // }

    useEffect(() => {

        setChecked({
            "Intended learners": data.message.intended.flag != null,
            "Course landing page": data.message.landing.flag != null,
            "Curriculum": data.curr?.reduce((acc, curr) => {

                return acc && curr.lectures.every((value) => value?.feedback !== undefined);
            }, true)
        });

    }, [data])

    useEffect(() => {
        const flag = Object.values(checked).every((value)=> value==true);
        console.log(flag);
        

        setAllowAction(flag);
        
    },[checked])

    useEffect(() => {
        (async () => {
            const res = await axiosInstance.get("/manage/courseDetail", {
                params: {
                    course_id: state._id
                }
            });

            dispatch(addReviewData({ data: res.data.data[0] }))

        })()
    }, [])


    return (
        <div className=''>

            {/* top bar */}
            <div className='flex fixed bg-[#2D2F31] px-6 py-2  text-white w-full  gap-4 items-center shadow-lg z-10'>

                <Link to={"/management/mode"}>
                    <div className='font-medium flex items-center gap-1 cursor-pointer hover:text-[#E0E0E0]  '>
                        <IoIosArrowBack className='w-[18px] h-[18px] ' />
                        <h1 >Back to courses </h1>
                    </div>
                </Link>

                <h1 className='font-bold text-xl'>{state.title}</h1>

                <h4 className='bg-[#6A6F73] px-2 text-sm font-bold my-auto py-[2px]'>DRAFT</h4>

                <h3 className='font-semibold'>0min of video content uploaded</h3>

                <IoMdSettings className='size-6 cursor-pointer  h-[40px]' />

            </div>

            {/* main */}
            <div className='p-6 flex relative top-16  '>

                <div className='w-[20%]  pt-8  space-y-10 '>

                    {sections.map((section, indx) => {
                        const comp = <ul key={indx} className=''>
                            <h1 className='font-bold py-2 pl-8'>{section.title}</h1>

                            {
                                section.list.map((value, indx) => {
                                    return (
                                        <li key={indx} onClick={() => setActive(value.active)} className={`flex items-center gap-2 cursor-pointer  py-2 hover:bg-[#F7F9FA] duration-75 ${(value.active === active) && "activeBlack"} pl-8`}>

                                            <div className='border border-black rounded-full p-[1.5px]'>
                                                <IoMdCheckmark className={`w-[15px] h-[15px] ${checked[value.name] == false && "opacity-0"}`} />
                                            </div>

                                            <h1 className=''>
                                                {value.name}
                                            </h1>

                                        </li>
                                    )
                                })
                            }


                        </ul>;


                        return comp
                    })}


                    <div className='space-y-2'>
                        <h1 className='text-center font-semibold text-lg '>
                            Course Action
                        </h1>

                        <div className={`flex  justify-between px-6 ${!allowAction && "opacity-70 cursor-not-allowed "}`}>
                            <button onClick={onCourseApprove} className={`bg-blue-600 hover:bg-blue-700 text-white  font-bold  px-3 py-1 hover:scale-105 transition-all duration-300 ${!allowAction && "opacity-70 cursor-not-allowed "}`}>Approve</button>

                            <button onClick={onCourseDisapprove} className={`bg-red-600 hover:bg-red-700 text-white  font-bold  px-2 py-1 hover:scale-105 transition-all duration-300 ${!allowAction && "opacity-70 cursor-not-allowed "}`}>Diapprove</button>
                        </div>
                    </div>

                </div>

                <div className='w-[80%] shadow-2xl border  pt-8 pb-16 mb-24 min-h-screen'>
                    {/* <Goals /> */}
                    {/* <CourseStructure/> */}
                    {/* <Setup/> */}
                    {render}
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default ReviewCourse
