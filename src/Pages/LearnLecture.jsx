import React, { useEffect, useState } from 'react'
import { FaCheck, FaStar } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { IoIosShareAlt } from 'react-icons/io';
import { MdClose, MdKeyboardArrowDown, MdOndemandVideo, MdOutlineArrowBack } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Logo from '@/components/Logo'
import { getlectures } from '@/Redux/Slices/CourseSlice';

const CircularProgress = ({ size = 100, progress = 75, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <div className='flex items-center gap-2'>
      <div className="flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="gray"
            strokeWidth={strokeWidth}
            className="opacity-30"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="blue"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-linear"
          />
        </svg>

        <div className="absolute text-sm font-semibold">
          {Math.round(progress)}%
        </div>
      </div>
      <h3 className='text-sm font-semibold'>Your Progress</h3>
    </div>
  );
};


const ContentTab = ({ data, setCurrentLecture, currentLecture, setPanel, full = true }) => {

  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionIndex) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex],
    }));
  };

  const Section = ({ section, Sindx }) => {

    const isExpanded = expandedSections[Sindx] || false;

    const onLectureChange = (indx) => {


      setCurrentLecture({
        ...currentLecture,
        sec: Sindx,
        lec: indx
      })
    }

    return (
      <div className='cursor-pointer  border-y border-slate-300'>
        <div onClick={() => toggleSection(Sindx)} className='p-4 bg-[#F7F9FA] space-y-1  relative'>
          <h1 className='flex justify-between'>Section {Sindx + 1}: {section?.title}</h1>
          <h3 className='text-xs font-normal'>2/4 | 9min</h3>
          <MdKeyboardArrowDown className={`absolute right-4 top-[20%] size-5  ${isExpanded && "-rotate-180"} duration-150`} />
        </div>
        {
          isExpanded && (
            section?.lectures?.map((lecture, indx) => (
              <div onClick={() => onLectureChange(indx)} key={indx} className={`px-4 space-y-2 font-normal py-3 duration-75 ${(currentLecture?.lec == indx && currentLecture?.sec == Sindx) ? "bg-[#D1D7DC]" : "hover:bg-[#D1D7DC] "}`}>

                <div className='flex gap-4'>
                  {/* Checkbox */}
                  <div onClick={(e) => e.stopPropagation()} className='flex items-center justify-center'>
                    <input type="checkbox" className='appearance-none h-4 w-4 border-2 border-black checked:bg-black cursor-pointer  peer' />
                    <FiCheck className='absolute size-3  text-white opacity-0 peer-checked:opacity-100 pointer-events-none' />
                  </div>

                  <h3 className='text-sm'>{indx + 1}. {lecture?.title}</h3>
                </div>

                <div className='text-xs flex items-center gap-1 ml-8 text-slate-500'><MdOndemandVideo className='size-4' /> {(lecture?.resource?.duration / 60).toFixed(1)}min</div>

              </div>
            ))
          )
        }

      </div>
    )
  }

  return (
    <div className='font-bold'>
      {
        full && (
          <h1 className='p-4 text-lg flex items-center justify-between'>Course content <MdClose onClick={() => setPanel(false)} title='Close panel' className='size-6 cursor-pointer' /></h1>
        )
      }
      {
        data?.map((section, indx) => <Section key={indx} section={section} Sindx={indx} />)
      }
    </div>
  )
}


function LearnLecture() {

  const { course_id } = useParams();

  const dispatch = useDispatch();

  const data = useSelector((state) => state?.course?.learn);

  const [currentLecture, setCurrentLecture] = useState({
    sec: 0, lec: 0
  });

  const [panel, setPanel] = useState(true);

  useEffect(() => {
    dispatch(getlectures({ course_id }))
  }, [])

  return (
    <div className='max-w-[100vw] overflow-hidden'>

      {/* top bar */}
      <div className='bg-[#1C1D1F] h-14 flex px-4 text-white gap-8 items-center'>

        <div className='flex h-[100%] items-center gap-4'>
          <Logo className={"text-white"} />
          <div className='w-[1px] h-1/3 bg-slate-600'></div>
          <h3 className='text-sm font-semibold'>{data?.title}</h3>
        </div>

        <div className='flex items-center ml-auto text-sm gap-2 cursor-pointer group'>
          <FaStar className='fill-[#6A6F73] size-5' />
          <h3 className='group-hover:text-slate-200 duration-100 font-semibold'>Leave a rating</h3>
        </div>



        <CircularProgress progress={25} size={40} strokeWidth={4} />

        <button className='border border-white h-10 p-3 flex items-center text-sm font-bold gap-1'>Share <IoIosShareAlt className='size-5' /></button>



      </div>

      {/* main */}

      <div className='flex relative'>

        <div className='h-[80vh] flex-grow shadow-inner'>

          <video className='h-full w-full bg-black outline-none' controls src={data?.sections[currentLecture?.sec].lectures[currentLecture?.lec]?.resource?.secure_url} onContextMenu={(e) => e.preventDefault()} controlsList="nodownload" />

          {/* video title */}
          {
            !panel && <>
              <div className='bg-black absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-50'></div>
              <h3 className='absolute top-6 left-6 text-white text-border  bg-blend-lighten z-10'>{currentLecture.lec + 1}. {data?.sections[currentLecture.sec].lectures[currentLecture.lec].title}</h3>
            </>
          }

          {/* Course content slide */}

          {
            !panel && (
              <div onClick={() => setPanel(true)} className='flex items-center bg-[#2D2F31] font-bold absolute top-12 right-0 text-white gap-2 p-3 hover:bg-[#3E4143] cursor-pointer  border-[1px] border-slate-600 translate-x-32 hover:translate-x-0 transition-transform duration-500 group '>
                <MdOutlineArrowBack className='size-6' />
                <h3 className='opacity-0 group-hover:opacity-100 duration-500'>Course content</h3>
              </div>
            )
          }

        </div>

        {
          panel && (
            <div className='w-[30vw]'>
              <ContentTab data={data?.sections} setCurrentLecture={setCurrentLecture} currentLecture={currentLecture} setPanel={setPanel} />
            </div>
          )
        }


      </div>

      {/* overview */}

      <div className='mx-28 h-[80vh] space-y-10'>

        <div className='border-b-2  w-full h-12 border-slate-300 flex px-10 font-bold gap-8 '>
          <h2 className='h-full flex items-center'>Course content</h2>
          <h2 className='h-full flex items-center'>Overview</h2>
          <h2 className='h-full flex items-center'>Reviews</h2>
        </div>

        {
          !panel && (
            <ContentTab data={data?.sections} setCurrentLecture={setCurrentLecture} currentLecture={currentLecture} setPanel={setPanel} full={false} />
          )
        }

      </div>


    </div>
  )
}

export default LearnLecture
