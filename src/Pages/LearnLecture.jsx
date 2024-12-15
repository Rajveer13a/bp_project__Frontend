import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi';
import { BsGlobe } from 'react-icons/bs';
import { FaLinkedin, FaRegStar, FaStar, FaStarHalf, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FiCheck } from 'react-icons/fi';
import { IoIosAlert, IoIosShareAlt, IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { MdClose, MdKeyboardArrowDown, MdOndemandVideo, MdOutlineArrowBack } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Footer from '@/components/Footer';
import Logo from '@/components/Logo'
import Rating from '@/components/Rating';
import { courseRatings, createProgressConfig, deleteRating, getlectures, lastViewed, markLecture, rateCourse } from '@/Redux/Slices/CourseSlice';

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

  const { progress } = data;

  const dispatch = useDispatch();

  const [expandedSections, setExpandedSections] = useState({ [currentLecture.sec]: true });

  const toggleSection = (sectionIndex) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex],
    }));
  };

  const onMarkLecture = async (Sindx, indx, flag) => {

    await dispatch(markLecture({
      location: [Sindx, indx],
      flag,
      course_id: data?._id
    }))

  }

  const Section = ({ section, Sindx }) => {

    const isExpanded = expandedSections[Sindx] || false;

    const onLectureChange = (indx) => {

      dispatch(lastViewed({
        section_no: Sindx,
        lecture_no: indx,
        course_id: data?._id
      }))

      setCurrentLecture({
        ...currentLecture,
        sec: Sindx,
        lec: indx
      })
    }

    const completed = section?.lectures.reduce((acc, _, indx) => {
      return progress.completed[Sindx]?.[indx] ? acc + 1 : acc;
    }, 0);

    const duration = section?.lectures.reduce((acc, curr, indx) => {
      return curr?.resource?.duration ? acc + curr?.resource?.duration : acc
    }, 0);




    return (
      <div className='cursor-pointer  border-y border-slate-300'>
        <div onClick={() => toggleSection(Sindx)} className='p-4 bg-[#F7F9FA] space-y-1  relative'>
          <h1 className='flex justify-between pr-8'>Section {Sindx + 1}: {section?.title}</h1>
          <h3 className='text-xs font-normal'>{completed}/{section?.lectures?.length} | {(duration / 60).toFixed(1)}min</h3>
          <MdKeyboardArrowDown className={`absolute right-4 top-[20%] size-5  ${isExpanded && "-rotate-180"} duration-150`} />
        </div>
        {
          isExpanded && (
            section?.lectures?.map((lecture, indx) => (
              <div onClick={() => onLectureChange(indx)} key={indx} className={`px-4 space-y-2 font-normal py-3 duration-75 ${(currentLecture?.lec == indx && currentLecture?.sec == Sindx) ? "bg-[#D1D7DC]" : "hover:bg-[#D1D7DC] "}`}>

                <div className='flex gap-4'>
                  {/* Checkbox */}
                  <div onClick={(e) => { e.stopPropagation(); onMarkLecture(Sindx, indx, !progress.completed[Sindx][indx]) }} className='flex items-center justify-center relative'>
                    <input checked={progress.completed[Sindx][indx]} type="checkbox" className='appearance-none h-4 w-4 border-2 border-black checked:bg-black cursor-pointer  peer' />
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

      <div className={`${full && "max-h-[80vh] overflow-y-scroll"}`}>
        {
          data?.sections?.map((section, indx) => <Section key={indx} section={section} Sindx={indx} />)
        }
      </div>

    </div>
  )
}

const Feedback = ({ panel,data }) => {

  const Bars = ({ percentage = 20, star = 5 }) => {

    return (
      <div className='flex items-center gap-1 w-full'>

        <div className='bg-[#D1D7DC] h-2 relative  mr-4 w-[65%]'>
          <div style={{ width: `${percentage}%` }} className={`h-full absolute left-0 bottom-0 bg-[#6A6F73]`}></div>
        </div>

        <Rating flag={false} total={star} size='text-xl' />

        <h2 className='underline text-blue-700'>{percentage}%</h2>

      </div>
    )
  }

  const Card = ({value}) => {

    const [more, setMore] = useState(false);

    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef(null);

    const [feedback, setFeedback] = useState(null);

    const getRelativeTime = (timestamp) => {
      const now = new Date();
      const past = new Date(timestamp);
      const diffInSeconds = Math.floor((now - past) / 1000);
  
      const units = [
          { unit: "year", seconds: 31536000 },
          { unit: "month", seconds: 2592000 },
          { unit: "day", seconds: 86400 },
          { unit: "hour", seconds: 3600 },
          { unit: "minute", seconds: 60 },
          { unit: "second", seconds: 1 },
      ];
  
      for (const { unit, seconds } of units) {
          const interval = Math.floor(diffInSeconds / seconds);
          if (interval >= 1) {
              return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-interval, unit);
          }
      }
  
      return "just now";
  }

    useEffect(() => {
      if (textRef.current) {
        const isOverflow = textRef.current.scrollHeight > 120;
        setIsOverflowing(isOverflow);
      }
    }, []);

    return (
      <div className='flex gap-8 w-[40vw] relative underBorder pb-6'>

        <div className='h-14 w-14 flex-shrink-0'> <img className='h-full w-full object-cover rounded-full' src={value?.profileImage?.secure_url || "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"} alt="" /></div>

        <div className='space-y-1 text-[#2D2F31]'>
          <h3 className='font-bold'>{value?.username}</h3>

          <div className='flex gap-2'><Rating total={value?.rating||5} flag={false} size='text-lg' /> <h3 className='text-sm text-slate-500'> {getRelativeTime(value?.updatedAt)} </h3></div>

          <div className='relative'>

            <p ref={textRef} className={`text-sm tracking-wide leading-loose ${!more && "max-h-[120px]"} overflow-clip pb-3`}>
              {value?.comment}
            </p>

            {
              (!more && isOverflowing) && <div className='bg-gradient-to-t from-white to-transparent absolute bottom-0 left-0 h-[55%] w-full '></div>
            }

            {
              isOverflowing && (
                <div onClick={() => setMore(!more)} className='flex gap-1 text-blue-700 cursor-pointer hover:text-blue-900 duration-150 absolute -bottom-3 -left-0 '>
                  <button className='font-bold text-sm'>Show {more ? "less" : "more"}</button>
                  <MdKeyboardArrowDown className={`size-4 mt-auto ${more && "rotate-180"} duration-150`} />
                </div>
              )
            }

          </div>

          <h3 className={`text-xs pb-2 ${isOverflowing && "pt-6 "} `}>
            { 
              feedback == null ? "Was this review helpful?" : "Thank you for your feedback"
            }
          </h3>

          <div className='flex gap-3 '>

            <div onClick={() => setFeedback(feedback == 0 ? null : 0)} className={`flex items-center justify-center p-2 rounded-full border border-black cursor-pointer  ${feedback == 0 ? "bg-slate-800 hover:bg-[#2D2F31]" : "hover:bg-[#E3E7EA]"}  `}>
              <BiLike className={`flex-shrink-0 size-5 ${feedback == 0 && "text-white"}`} />
            </div>

            <div onClick={() => setFeedback(feedback == 1 ? null : 1)} className={`flex items-center justify-center p-2 rounded-full border border-black cursor-pointer  ${feedback == 1 ? "bg-slate-800 hover:bg-[#2D2F31]" : "hover:bg-[#E3E7EA]"}  `}>
              <BiDislike className={`flex-shrink-0 size-5 ${feedback == 1 && "text-white"}`} />
            </div>

          </div>


        </div>

      </div>
    )
  }

  return (
    <div className={`text-[#2D2F31]  py-4 ${panel ? "px-8" : "px-24"}`}>

      <h1 className='text-2xl font-bold'>Student feedback</h1>

      {/* review stats */}
      <div className='flex gap-8 mt-4 items-center'>

        <div className='text-[#B4690E]  space-y-1'>
          <h1 className='text-6xl font-bold'>
            4.0
          </h1>
          <Rating size='text-xl' total={4} flag={false} />
          <h2 className='font-bold text-sm'>Course Rating</h2>
        </div>

        <div className='space-y-1 w-full'>
          <Bars star={5} percentage={52} />
          <Bars star={4} percentage={28} />
          <Bars star={3} percentage={13} />
          <Bars star={2} percentage={4} />
          <Bars star={1} percentage={3} />
        </div>

      </div>

      <div className='mt-8 space-y-6'>
        <h1 className='text-2xl font-bold'>Reviews</h1>

        <div className='space-y-8'>

          {
            data?.ratings?.map((value,indx)=> value?.comment && <Card key={indx} value={value} />)
          }

        </div>


      </div>

    </div>
  )
}

export const RateCourse = ({ course_id, setter, userRating }) => {

  const userdata = useSelector((state) => state?.auth?.data);

  const dispatch = useDispatch();

  const [starindx, setStarIndx] = useState(-2);

  const [rating, setRating] = useState(userRating ? ( (userRating?.rating - 1)*2 - 1 ) : -2);

  const [interact, setInteract] = useState(false);

  const [text, setText] = useState(userRating ? userRating.comment : "");

  const [overflowNeeded, setOverflowNeeded] = useState(null);

  const textRef = useRef(null);

  const [showMore, setShowMore] = useState(false);
  // console.log(1 + (rating + 1) / 2);

  const [step, setStep] = useState(userRating ? -1 : 0);

  const ratingText = ["Awful, not what I expected at all", "Awful / Poor", "Poor, pretty disappointed", "Poor / Average", "Average, could be better", "Average / Good", "Good, what I expected", "Good / Amazing", "Amazing, above expectations!"];

  const onSave = async () => {
    await dispatch(rateCourse({
      rating: 1 + (rating + 1) / 2,
      course_id,
      comment: text
    }));

    setter(false);

    dispatch(getlectures({ course_id }))

  }

  const onDeleteRating = async() => {

    const res = await dispatch(deleteRating({course_id}));

    if(res?.payload){
      setter(false);
      dispatch(getlectures({ course_id }))
    }
  }

  useEffect(() => {

    if (textRef?.current) {
      setOverflowNeeded(textRef?.current.scrollHeight > 208);
    }

  }, [step]);

  useEffect(() => {

    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className='flex items-center justify-center h-[100vh] w-full absolute z-20'>

      <div className=' bg-black opacity-70 absolute  h-full w-full'></div>


      {/* Main */}
      <div className='absolute bg-white  w-[48vw] z-10 px-8 py-6  flex flex-col items-center shadow-inner  space-y-6 '>

        <div className='absolute flex justify-between w-full px-4 items-center'>
          {
            (rating != -2 && !userRating) && <button onClick={() => { step ? setStep(0) : setRating(-2) }} className='text  p-2 text-blue-800 text-sm font-bold'>Back</button>
          }

          <button onClick={() => setter(false)} className='text-xl p-2 ml-auto'><RxCross2 /></button>
        </div>

        {
          step == -2 && (
            <div className='w-full space-y-2'>

              <h2 className='text-xl font-bold  relative bottom-5'>Delete Your Review?</h2>

              <h3 className=''>Are you sure you want to delete your review?</h3>

              <div className='w-full flex gap-4 pt-4'>

              <button onClick={()=>setStep(-1)} className='h-12font-bold px-3 ml-auto duration-100 shrink-0 font-bold'>Cancel</button>

              <button onClick={onDeleteRating} className='h-12 bg-slate-900 text-white font-bold px-3 hover:bg-slate-800 duration-100 shrink-0'>Yes, Delete My Review</button>

              </div>

            </div>
          )
        }

        {
          step == -1 && (
            <div className='w-full space-y-2'>
              <h2 className='text-xl font-bold  relative bottom-5 w-[20vw]'>Your Review</h2>

              <Rating total={userRating?.rating} flag={false} size='text-xl'/>

              {/* <h3 className='pt-4'>{userRating?.comment || "There are no written comments for your review." }</h3> */}
              
              <div className=' relative'>

                <h3 ref={textRef} className={`leading-relaxed relative overflow-hidden ${(!showMore && overflowNeeded) && "max-h-52"}`}>
                  {text || "There are no written comments for your review."}

                  {
                    (!showMore && overflowNeeded) && <div className='bg-gradient-to-t from-white to-transparent h-full w-full absolute bottom-0 left-0'></div>
                  }
                </h3>

                {
                  overflowNeeded && (
                    <div onClick={() => setShowMore(!showMore)} className='flex gap-1 text-blue-700 cursor-pointer hover:text-blue-900 duration-150 absolute -bottom-6 -left-0'>
                      <button className='font-bold text-sm'>Show {showMore ? "less" : "more"}</button>
                      <MdKeyboardArrowDown className={`size-2 mt-auto ${showMore && "rotate-180"} duration-150`} />
                    </div>
                  )
                }

              </div>

              <div className='w-full flex gap-4 pt-4'>

              <button onClick={()=>setStep(-2)} className='h-12font-bold px-3 ml-auto duration-100 shrink-0 font-bold'>Delete</button>

              <button onClick={()=>setStep(0)} className='h-12 bg-slate-900 text-white font-bold px-3 hover:bg-slate-800 duration-100 shrink-0'>Edit Review</button>

              </div>

            </div>
          )
        }

        {
          step == 0 && (
            <>
              <h2 className='text-2xl font-bold text-center '>{rating == -2 ? "How would you rate this course?" : "Why did you leave this rating?"}</h2>

              {/* stars */}
              <div>
                <h3 className='font-bold  text-center w-full'> {(ratingText[starindx + 1 < 0 ? rating + 1 : starindx + 1]) || "Select Rating"}  </h3>


                <div className='flex cursor-pointer text-[#f69c08] mt-[2px] '>

                  <IoMdStarOutline onMouseEnter={() => { setStarIndx(-1); setInteract(true) }} onMouseLeave={() => { setStarIndx(-2); setInteract(false) }} onClick={() => setRating(-1)} className={` ${(starindx >= -1 || rating >= -1) && "hidden"} text-6xl`} />

                  <IoMdStar onMouseEnter={() => { setStarIndx(-1); setInteract(true) }} onMouseLeave={() => { setStarIndx(-2); setInteract(false) }} onClick={() => setRating(-1)} className={` ${!(starindx >= -1 || rating >= -1) && "hidden"} text-6xl`} />


                  {

                    Array(4).fill().map((value, indx) => {

                      const firstHalfIndex = indx * 2;

                      const secondHalfIndex = indx * 2 + 1;

                      return (
                        <div key={indx} className='text-6xl flex relative w-14'>

                          <div onMouseEnter={() => { setStarIndx(firstHalfIndex); setInteract(true) }} onMouseLeave={() => { setStarIndx(-2); setInteract(false) }} onClick={() => setRating(firstHalfIndex)} style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} className=' overflow-hidden group absolute '>
                            <IoMdStar className={` ${(starindx >= firstHalfIndex || (rating >= firstHalfIndex && !interact)) ? "" : "hidden"}`} />
                          </div>

                          {/* outline left */}
                          <div onMouseEnter={() => { setStarIndx(firstHalfIndex); setInteract(true) }} onMouseLeave={() => { setStarIndx(-2); setInteract(false) }} onClick={() => setRating(firstHalfIndex)} style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} className=' overflow-hidden group absolute '>
                            <IoMdStarOutline className={` ${(starindx >= firstHalfIndex || (rating >= firstHalfIndex && !interact)) && "hidden"}`} />
                          </div>

                          {/* outline right */}
                          <div onMouseEnter={() => { setStarIndx(secondHalfIndex); setInteract(true) }} onMouseLeave={() => { setStarIndx(-2); setInteract(false) }} onClick={() => setRating(secondHalfIndex)} style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }} className='overflow-hidden group absolute'>
                            <IoMdStarOutline className={`  ${(starindx >= secondHalfIndex || (rating >= secondHalfIndex && !interact)) && "hidden"}`} />
                          </div>

                          <div onMouseEnter={() => { setStarIndx(secondHalfIndex); setInteract(true) }} onMouseLeave={() => { setStarIndx(-2); setInteract(false) }} onClick={() => setRating(secondHalfIndex)} style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }} className='overflow-hidden group absolute'>
                            <IoMdStar className={` fil ${(starindx >= secondHalfIndex || (rating >= secondHalfIndex && !interact)) ? "" : "hidden"}`} />
                          </div>

                        </div>
                      )
                    })
                  }
                </div>
              </div>

              {
                rating != -2 && <>
                  <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Tell us about your own personal experience taking this course. Was it a good match for you?' className='w-full min-h-40 border border-black p-4 resize-none placeholder:text-slate-500' />

                  <button onClick={() => setStep(1)} className='h-12 bg-slate-800 text-white font-bold px-3 ml-auto  hover:bg-slate-700 duration-100'>Save and Continue</button>
                </>
              }
            </>
          )
        }


        {
          step == 1 && (<>
            <h2 className='font-bold text-2xl pt-8'>Thanks for helping our community!</h2>

            <div className='flex justify-between w-full border-y border-slate-400 py-8'>

              <div className='flex gap-4'>
                <div className='h-16 w-16 '><img className='h-full w-full object-cover rounded-full' src={userdata?.profileImage?.secure_url} alt="" /></div>
                <h2 className='text-lg'>{userdata?.username}</h2>
              </div>

              <div className='w-[50%] space-y-3 relative'>

                <Rating total={1 + (rating + 1) / 2} flag={false} size='text-xl' />

                <h3 ref={textRef} className={` relative overflow-hidden ${(!showMore && overflowNeeded) && "max-h-52"}`}>
                  {text || "There are no written comments for your review."}

                  {
                    (!showMore && overflowNeeded) && <div className='bg-gradient-to-t from-white to-transparent h-full w-full absolute bottom-0 left-0'></div>
                  }
                </h3>

                {
                  overflowNeeded && (
                    <div onClick={() => setShowMore(!showMore)} className='flex gap-1 text-blue-700 cursor-pointer hover:text-blue-900 duration-150 absolute -bottom-6 -left-0'>
                      <button className='font-bold text-sm'>Show {showMore ? "less" : "more"}</button>
                      <MdKeyboardArrowDown className={`size-2 mt-auto ${showMore && "rotate-180"} duration-150`} />
                    </div>
                  )
                }

              </div>

            </div>

            <button onClick={onSave} className='h-12 bg-slate-900 text-white font-bold px-3 ml-auto  hover:bg-slate-800 duration-100 shrink-0'>Save and Exit</button>

          </>)
        }


      </div>

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

  const [panel, setPanel] = useState(false);

  const [active, setActive] = useState(1);

  const [showMore, setShowMore] = useState(false);

  const totalLectures = useMemo(() => {
    return data?.sections?.reduce((acc, section) => acc + (section?.lectures?.length || 0), 0);
  }, [data?.sections]);

  const totalDuration = useMemo(() => {
    return data?.sections?.reduce((acc, section) => {
      acc += section?.lectures?.reduce((total, lecture) => total += lecture?.resource?.duration || 0, 0) || 0;
      return acc;
    }, 0);
  }, [data?.sections]);

  const markedLectures = data?.progress?.completed?.reduce((acc, curr) => {
    return acc + curr?.reduce((total, flag) => {
      if (flag) return total + 1;
      return total;
    }, 0);
  }, 0);

  const heightRef = useRef(null);

  const [height, setHeight] = useState(0);

  const [showRatingDialog, setShowRatingDialog] = useState(false);

  const [ratings, setRatings] = useState(null);

  useEffect(() => {

    if (data && !data?.progress) {

      const schema = data?.sections.map((section) => section?.lectures?.length);

      dispatch(createProgressConfig({
        schema,
        course_id
      }));

    }

    if (data?.progress) {

      const { section_no, lecture_no } = data.progress.lastView

      setCurrentLecture({
        sec: section_no, lec: lecture_no
      })
    }

  }, [data])

  useEffect(() => {
    if (heightRef.current) {
      setHeight(heightRef.current.scrollHeight);
    }
  }, [])

  useEffect(() => {

    const execute = async() => {
      await dispatch(getlectures({ course_id }));
      dispatch(courseRatings(course_id));
    }

    execute();
    
  }, [])

  return (

    <>

      {
        showRatingDialog && <RateCourse course_id={course_id} setter={(setShowRatingDialog)} userRating={data?.userRating} />
      }




      <div ref={heightRef} className='max-w-[100vw] overflow-x-hidden'>

        {/* top bar */}
        <div className='bg-[#1C1D1F] h-14 flex px-4 text-white gap-8 items-center'>

          <div className='flex h-[100%] items-center gap-4'>
            <Logo className={"text-white"} />
            <div className='w-[1px] h-1/3 bg-slate-600'></div>
            <h3 className='text-sm font-semibold'>{data?.title}</h3>
          </div>

          {
            !data?.userRating ? <button onClick={() => setShowRatingDialog(true)} className='flex items-center ml-auto text-sm gap-2 cursor-pointer group'>
              <FaStar className='fill-[#6A6F73] size-5' />
              <h3 className='group-hover:text-slate-200 duration-100 font-semibold'>Leave a rating</h3>
            </button> :

              <button onClick={() => setShowRatingDialog(true)} className='flex items-center ml-auto text-sm gap-2' >
                <Rating total={data?.userRating?.rating} flag={false} size='text-xl' color='#0000FF' />
              </button>
          }



          <CircularProgress progress={markedLectures ? (markedLectures / totalLectures) * 100 : 0} size={40} strokeWidth={4} />



          <button className='border border-white h-10 p-3 flex items-center text-sm font-bold gap-1'>Share <IoIosShareAlt className='size-5' /></button>



        </div>

        {/* main */}

        <div className='flex '>

          <div className='flex-grow '>

            {/* video */}
            <div className='h-[80vh] shadow-inner relative'>

              <video className='h-full w-full bg-black outline-none' controls src={data?.sections[currentLecture?.sec]?.lectures[currentLecture?.lec]?.resource?.secure_url} onContextMenu={(e) => e.preventDefault()} controlsList="nodownload" />

              {/* video title */}
              {
                !panel && <>
                  <div className='bg-black absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-50'></div>
                  <h3 className='absolute top-6 left-6 text-white text-border  bg-blend-lighten z-10'>{currentLecture.lec + 1}. {data?.sections[currentLecture.sec]?.lectures[currentLecture.lec].title}</h3>
                </>
              }

              {/* Course content slide */}

              {
                !panel && (
                  <div onClick={() => { setPanel(true); active == 0 && setActive(1) }} className='flex items-center bg-[#2D2F31] font-bold absolute top-12 right-0 text-white gap-2 p-3 hover:bg-[#3E4143] cursor-pointer  border-[1px] border-slate-600 translate-x-32 hover:translate-x-0 transition-transform duration-500 group '>
                    <MdOutlineArrowBack className='size-6' />
                    <h3 className='opacity-0 group-hover:opacity-100 duration-500'>Course content</h3>
                  </div>
                )
              }

            </div>


            {/* tabs */}

            <div className={`h-min-[80vh] pb-24 space-y-6 ${!panel ? "mx-28" : "mx-4"}`}>

              <div className='border-b-2  w-full h-14 border-slate-300 flex px-10 font-bold gap-6  '>
                {
                  !panel && <h2 onClick={() => setActive(0)} className={`h-full flex items-center relative px-2 ${active == 0 ? "select-tab text-slate-950" : "text-slate-500 hover:text-slate-900"} cursor-pointer duration-100 `}>Course content</h2>
                }
                <h2 onClick={() => setActive(1)} className={`h-full flex items-center relative px-2 ${active == 1 ? "select-tab text-slate-950" : "text-slate-500 hover:text-slate-900"} cursor-pointer duration-100 `}>Overview</h2>
                <h2 onClick={() => setActive(2)} className={`h-full flex items-center relative px-2 ${active == 2 ? "select-tab text-slate-950" : "text-slate-500 hover:text-slate-900"} cursor-pointer duration-100 `}>Reviews</h2>
              </div>

              {
                (!panel && active === 0) && (
                  <div className='px-24 pt-10'>
                    <ContentTab data={data} setCurrentLecture={setCurrentLecture} currentLecture={currentLecture} setPanel={setPanel} full={false} />
                  </div>
                )
              }

              {/* overview */}
              {
                active === 1 && (
                  <>
                    <div className='px-8 space-y-3'>

                      <h2 className='text-xl font-medium text-[#2D2F31]'>{data?.subtitle}</h2>

                      <div className='flex gap-8 mt-7'>

                        <div>
                          <div className='flex items-center gap-1 font-bold'>4.0 <FaStar className='text-[#B4690E]' /></div>
                          <h3 className='text-xs text-slate-500'>6,011 ratings</h3>
                        </div>

                        <div>
                          <h3 className='font-bold'>192,195</h3>
                          <h3 className='text-xs text-slate-500'>6,011 ratings</h3>
                        </div>

                        <div>
                          <h3 className='font-bold'>{(totalDuration / 3600).toFixed(1)} hours</h3>
                          <h3 className='text-xs text-slate-500'>Total</h3>
                        </div>

                      </div>

                      <div className='flex text-sm gap-2 items-center text-slate-800'>
                        <IoIosAlert className='size-4' /> Last updated January 2022
                      </div>

                      <div className='flex text-sm gap-2 items-center text-slate-800'>
                        <BsGlobe className='size-4' /> {data?.language.slice(0, 1).toUpperCase() + data?.language.slice(1)}
                      </div>




                    </div>

                    <div className='text-[#2D2F31]'>

                      <div className='flex border-t border-slate-300 px-8 gap-32 py-6'>
                        <h2>By the numbers</h2>

                        <h2>
                          Skill level: {data?.level} <br />
                          Students: {data?.totalStudents} <br />
                          Languages: {data?.language.slice(0, 1).toUpperCase() + data?.language.slice(1)} <br />
                          Captions: Yes <br />
                        </h2>

                        <h2>
                          Lectures: {totalLectures} <br />
                          Video: {(totalDuration / 3600).toFixed(1)} total hours
                        </h2>

                      </div>

                      <div className={`${!showMore && "h-[70vh]"} overflow-y-clip relative pb-10`}>

                        <div className='flex border-t border-slate-300 px-8 gap-32 py-6 relative'>

                          <h2>Description</h2>

                          <h2 className={`w-[45vw] ${!showMore && "h-[61vh]"} overflow-y-clip relative`}>
                            {data?.description}

                            {
                              !showMore && <div className='bg-gradient-to-t from-white to-transparent absolute top-0 left-0 w-full h-full'></div>
                            }

                          </h2>

                        </div>

                        <div className='flex border-t border-slate-300 px-8 gap-32 py-6 mt-10'>
                          <h2>Instructor</h2>

                          <div className='space-y-4'>

                            <div className='flex gap-5'>

                              <div className=' h-16'><img src={data?.instructor?.image} className='rounded-full h-full w-full object-cover' alt="" /></div>

                              <div>
                                <h2 className='font-bold'>{data?.instructor?.username}</h2>
                                <h2>We are Security Enginners, who keeps the internt world safer</h2>
                              </div>

                            </div>

                            <div className='flex gap-5'>

                              <Link className='bg-black p-2 opacity-40 cursor-pointer hover:opacity-100 duration-100 '>
                                <FaSquareXTwitter className='size-4   text-white' />
                              </Link>

                              <Link className='bg-black p-2 opacity-40 cursor-pointer hover:opacity-100 duration-100 '>
                                <FaLinkedin className='size-4   text-white' />

                              </Link>

                              <Link className='bg-black p-2 opacity-40 cursor-pointer hover:opacity-100 duration-100 '>
                                <FaYoutube className='size-4   text-white' />
                              </Link>

                            </div>

                            <p>
                              {data?.instructor?.bio}
                            </p>

                          </div>



                        </div>

                        <div onClick={() => setShowMore(!showMore)} className='flex gap-1 text-blue-700 cursor-pointer hover:text-blue-900 duration-150 absolute -bottom-0 -left-0'>
                          <button className='font-bold text-sm'>Show {showMore ? "less" : "more"}</button>
                          <MdKeyboardArrowDown className={`size-4 mt-auto ${showMore && "rotate-180"} duration-150`} />
                        </div>

                      </div>

                    </div>

                  </>
                )
              }


              {
                active === 2 && <Feedback panel={panel} data={data} />
              }

            </div>

            <Footer />

          </div>

          {/* right content panel */}
          {
            panel && (
              <div className='w-[50vw]'>
                <div style={{ height: `${height - 100}px` }} className={`absolute`}>
                  <div className='sticky top-0 '>
                    <ContentTab data={data} setCurrentLecture={setCurrentLecture} currentLecture={currentLecture} setPanel={setPanel} progress={data?.progress} />
                  </div>
                </div>
              </div>
            )
          }


        </div>




      </div>
    </>



  )
}

export default LearnLecture
