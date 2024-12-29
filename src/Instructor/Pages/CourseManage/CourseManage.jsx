import { list } from 'postcss';
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoMdCheckmark, IoMdSettings } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

import Footer from '@/components/Footer';
import { courseDetails, getCourseReview, instructorDetails, submitForApproval, } from '@/Redux/Slices/Instructor/InstructorSlice';

import CourseStructure from './Pages/CourseStructure';
import Curriculum from './Pages/Curriculum/Curriculum';
import Film from './Pages/Film';
import Goals from './Pages/Goals';
import LandingPage from './Pages/LandingPage';
import Price from './Pages/Price';
import Settings from './Pages/Settings';
import Setup from './Pages/Setup';


const DeletingAlert = ({ onCancel, onConfirm }) => {


    useEffect(() => {

        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);


    return <>
        <div className='fixed h-[100vh] w-[100vw] z-50' >
            <div className='bg-black h-[100vh] w-[100vw] absolute -z-40  opacity-70'>
            </div>

            <div className='flex justify-center items-center h-[100vh] w-[100vw] z-50 '>
                <div className='bg-white h-52 w-[45%] border border-black p-5 flex flex-col '>

                    <div className=' flex justify-between items-center'>
                        <h1 className='font-bold text-xl'>Please Confirm</h1>
                        <button onClick={onCancel} ><RxCross2 className='size-5' /></button>
                    </div>

                    <h1 className='py-5'>
                        You are about to remove a curriculum item. Are you sure you want to continue?
                    </h1>

                    <div className='ml-auto space-x-2'>
                        <button onClick={onCancel} className=' h-11 w-20 font-bold '>Cancel</button>
                        <button onClick={onConfirm} className='bg-slate-800 text-white h-11 w-20 font-bold hover:bg-slate-700'>OK</button>
                    </div>

                </div>
            </div>

        </div>
    </>
}

const SubmitRequirement = ({ onCancel }) => {

    const list = [
        {
            heading: <Link className='link-primary underline'>Intended learners</Link>,
            subheadings: [
                "Specify any course requirements or prerequisites",
                "Specify at least 4 of your course’s learning objectives",
                "Specify who this course if for"
            ]
        },
        {
            heading: <Link className='link-primary underline'>Curriculum</Link>,
            subheadings: [
                "Have at least 30 minutes of video content",
                "Have at least 5 lectures",

            ]
        },
        {
            heading: <Link className='link-primary underline'>Course landing page</Link>,
            subheadings: [
                "Have a course description with at least 200 words",
                "Have a course subtitle",
                "Select the category of your course",
                "Select the level of your course",
                "Select the subcategory of your course",
                "Select what is primarily taught in your course",
                "Upload a course image"

            ]
        },
        {
            heading: <Link className='link-primary underline'>Pricing </Link>,
            subheadings: [
                "Select a price for your course",
            ]
        }
    ]

    useEffect(() => {

        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);


    return <>
        <div className='fixed h-[100vh] w-[100vw] z-50 ' >
            <div className='bg-black h-[120vh]  w-[100vw] absolute -z-40  opacity-70'>
            </div>

            <div className='flex justify-center overflow-scroll   h-[100vh]  w-[100vw] z-50 '>
                <div className='bg-white relative top-14 h-max   w-[45%] border border-black p-5 flex flex-col '>

                    <div className=' flex justify-between items-center'>
                        <h1 className='font-bold text-xl'>Why can't I submit for review?</h1>
                        <button onClick={() => onCancel(false)} ><RxCross2 className='size-5' /></button>
                    </div>

                    <h1 className='py-5'>
                        You're almost ready to submit your course. Here are a few more items you need.
                    </h1>

                    {
                        list.map((value, indx) => {
                            return (
                                <ul key={indx} className='p-3'>
                                    <li className='list-disc'>
                                        On the {value.heading} page, you must

                                        <ul className='px-6 list-[circle] pt-2'>
                                            {
                                                value.subheadings.map((value, indx) => {
                                                    return <li key={indx} className=''>{value}</li>
                                                })
                                            }
                                        </ul>
                                    </li>
                                </ul>
                            )
                        })
                    }

                    <p>
                        Once you complete these steps, you will be able to successfully submit your course for review.
                    </p>
                    <p className='mt-2'>
                        Still having problems? <Link className='link-primary underline'>Check out this Support page</Link>
                    </p>


                </div>
            </div>

        </div>
    </>
}

function CourseManage() {

    const data = useSelector((state) => state?.instructor?.edit)
    const [showDialog, setShowDialog] = useState(false);
    const [onConfirm, setOnConfirm] = useState(null);
    const navigate = useNavigate();

    const [approvalStatus , setApprovalStatus] = useState(null);

    const [contentDuration, setContentDuration] = useState(0);
    const [totalLectures, setTotalLectures] = useState(0);

    const dispatch = useDispatch();

    const handleDeleteRequest = (deleteThunk) => {
        setShowDialog(true);
        setOnConfirm(() => deleteThunk);

    }

    const handleDialogClose = (confirmed) => {
        setShowDialog(false);
        if (confirmed && onConfirm) {
            onConfirm();
        }
    }

    const [saveEnable, setSaveEnable] = useState(false);

    const [saveThunk, setSaveThunk] = useState(null);

    const handleOnSave = () => {
        if (saveEnable && saveThunk) {
            saveThunk();
        }
        setSaveEnable(false)
    }

    const [checked, setChecked] = useState({
        "Intended learners": false,
        "Curriculum": false,
        "Course landing page": false,
        "Pricing": false,

    });


    useEffect(() => {

        let intendLearners = false;
        let curr = false;
        let lanPage = false;

        let goals = data.goals;

        let flag = goals?.objectives.filter(Boolean)?.length >= 4;
        flag = flag && goals?.prerequisites.filter(Boolean)?.length >= 1;
        flag = flag && goals?.intended_learners.filter(Boolean)?.length >= 1;
        intendLearners = flag;


        curr = contentDuration >= 120;
        curr = curr && totalLectures >= 5;

        lanPage = data?.trailerVideo && data?.thumbnail && data?.subtitle && data?.language && data?.description;
        console.log("lannn", lanPage)

        setChecked({
            "Intended learners": intendLearners,
            "Curriculum": curr,
            "Course landing page": lanPage || false,
            "Pricing": data.price != undefined && true
        })

    }, [data])





    // console.log(checked);



    // const checkbox = <div className='border border-black rounded-full p-[1.5px]'>
    //     <IoMdCheckmark className='w-[15px] h-[15px] opacity-0' />
    // </div>;

    const { section: active, id } = useParams();

    let render;
    switch (active) {
        case "goals":
            render = <Goals setSaveThunk={setSaveThunk} setSaveEnable={setSaveEnable} approvalStatus={approvalStatus} />
            break;
        case "course-structure":
            render = <CourseStructure />
            break;
        case "setup":
            render = <Setup />
            break;
        case "film":
            render = <Film />
            break;

        case "curriculum":
            render = <Curriculum onDeleteRequest={handleDeleteRequest} />
            break;

        case "settings":
            render = <Settings onDeleteRequest={handleDeleteRequest} />
            break;

        case "basics":
            render = <LandingPage setSaveThunk={setSaveThunk} setSaveEnable={setSaveEnable} approvalStatus={approvalStatus} />
            break;
        case "pricing":
            render = <Price />
            break;

    }

    const [showSubmit, setShowSubmit] = useState(false);
    // console.log(showSubmit);

    const sections = [
        {
            title: "Plan your course",
            list: [
                { name: "Intended learners", link: "goals" },
                { name: "Course structure", link: "course-structure" },
                { name: "Setup & test video", link: "setup" },
            ]
        },

        {
            title: "Create your content",
            list: [
                { name: "Film & edits", link: "film" },
                { name: "Curriculum", link: "curriculum" },
                // { name: "Captions (optional)", link: "captions" },
                // { name: "Accessibility (optional)", link: "accessibility" },
            ]
        },

        {
            title: "Publish your course",
            list: [
                { name: "Course landing page", link: "basics" },
                { name: "Pricing", link: "pricing" },
                // { name: "Promotions", link: "promotions" },
                // { name: "Course messages", link: "messages" },
            ]
        },

    ]

    const onSubmitForApproval = async() => {
        // if(Object.values(checked).some((value)=> value == false)){
        //     setShowSubmit(true);
        //     return;
        // }
        
        await dispatch(submitForApproval({
            course_id: id
        }))
        await dispatch(instructorDetails())
        navigate("/instructor/courses");

    }

    useEffect(() => {
        dispatch(courseDetails(id));
        (async()=>{
            const res = await dispatch(getCourseReview({course_id: id}));

            if(res.payload){
                setApprovalStatus(res.payload.data);
            }

        })()
    }, [])

    useEffect(() => {
        let accum = 0
        let lec_count = 0
        data.sections?.forEach((section) => {
            section?.lectures.forEach((lecture) => {
                accum += lecture?.resource?.duration || 0;
                if (lecture?.resource?.duration) lec_count++

            })
        });

        accum = accum / 60;

        accum = Math.round(accum * 10) / 10;

        setContentDuration(accum);
        setTotalLectures(lec_count);


    }, [data])

    return (
        <div className=''>

            {
                showSubmit && (
                    <SubmitRequirement onCancel={setShowSubmit} />
                )
            }

            {showDialog && <DeletingAlert onCancel={() => handleDialogClose(false)} onConfirm={() => handleDialogClose(true)} />}

            {/* top bar */}
            <div className='flex fixed bg-[#2D2F31] px-6 py-2  text-white w-full  gap-4 items-center shadow-lg z-40'>

                <Link to={"/instructor/courses"}>
                    <div className='font-medium flex items-center gap-1 cursor-pointer hover:text-[#E0E0E0]  '>
                        <IoIosArrowBack className='w-[18px] h-[18px] ' />
                        <h1 >Back to courses </h1>
                    </div>
                </Link>

                <h1 className='font-bold text-xl truncate w-[30%]'>{data?.title}</h1>

                <h4 className={` px-2 text-sm font-bold my-auto py-[2px] ${data?.approved ?"bg-gradient-to-r from-blue-900 to-blue-700" : "bg-[#6A6F73]"}`}>{data?.approved ? "LIVE" : "DRAFT"}</h4>

                <h3 className='font-semibold'>{contentDuration} min of video content uploaded</h3>

                <button onClick={handleOnSave} className={` text-black px-6 py-1 font-bold ml-auto ${!saveEnable ? "cursor-not-allowed bg-[#969798] " : " bg-white hover:bg-[#E0E0E0] "}`}>Save</button>

                <Link to={`/instructor/course/${id}/manage/settings`}><IoMdSettings className='size-6 cursor-pointer  h-[40px]' /></Link>
            </div>

            {/* main */}
            <div className='p-6 flex relative top-16  '>

                <div className='w-[20%]  pt-8  space-y-10 '>

                    {sections.map((section) => {
                        const comp = <ul key={uuidv4()} className=''>
                            <h1 className='font-bold py-2 pl-8'>{section.title}</h1>

                            {
                                section.list.map((value) => {
                                    return (
                                        <Link to={`/instructor/course/${id}/manage/${value.link}`} key={uuidv4()}>
                                            <li className={`flex items-center gap-2 cursor-pointer  py-2 hover:bg-[#F7F9FA] duration-75 ${(value.link === active) && "activeBlack"} pl-8`}>

                                                <div className='border border-black rounded-full p-[1.5px]'>
                                                    <IoMdCheckmark className={`w-[15px] h-[15px] ${checked[value.name] == false && "opacity-0"}`} />
                                                </div>

                                                <h1 className=''>
                                                    {value.name}
                                                </h1>

                                            </li>
                                        </Link>
                                    )
                                })
                            }


                        </ul>;


                        return comp
                    })}

                    <button onClick={onSubmitForApproval} className='bg-blue-600 text-white  font-bold  px-10 py-3 '>Submit for Review</button>

                </div>

                <div className='w-[80%] shadow-2xl border  pt-8 pb-16 mb-24'>
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

export default CourseManage
