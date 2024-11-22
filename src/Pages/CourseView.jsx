import { useEffect, useState } from 'react';
import { AiOutlineTrophy } from 'react-icons/ai';
import { BiMobile } from 'react-icons/bi';
import { FaRegFile, FaRegHeart } from 'react-icons/fa';
import { GrPlayFill } from 'react-icons/gr';
import { IoIosAlert, IoIosPlayCircle, IoMdCode } from 'react-icons/io';
import { IoCheckmark, IoPlaySharp } from 'react-icons/io5';
import { LiaStarSolid } from 'react-icons/lia';
import { MdKeyboardArrowDown, MdOutlineOndemandVideo, MdOutlineSmartDisplay, MdPeople } from 'react-icons/md';
import { RiFolderDownloadLine, RiMedalLine } from 'react-icons/ri';
import { TbPointFilled, TbWorld } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Rating from '@/components/Rating';
import HomeLayout from '@/Layouts/HomeLayout';
import { courseDetail } from '@/Redux/Slices/CourseSlice';

const SectionDropDown = ({ section, last, expandAll = false }) => {

  const [expand, setExpand] = useState(false);

  const total = section?.lectures?.reduce((acc, curr) => acc + curr?.duration, 0);

  useEffect(() => {
    setExpand(expandAll);
  }, [expandAll])




  return (
    <>

      <div onClick={() => setExpand(!expand)} className={`bg-[#F7F9FA] p-4 flex items-center px-5 justify-between cursor-pointer ${!last && "border-b"}`}>
        {/* section name */}
        <div className='flex gap-2 w-[75%]'>
          <MdKeyboardArrowDown className={`size-5 ${expand && "-rotate-180"} duration-200`} />
          <h1 className='font-bold'>{section?.title}</h1>
        </div>

        <h3 className='text-sm'> {section?.lectures.length} lectures • {total ? (total / 60).toFixed(1) : "0"}min </h3>

      </div>

      {expand && (
        <div className={`bg-white  border-slate-300 ${last ? " border-t" : "border-b"}`}>

          {section?.lectures?.map((lecture, indx) => (
            <div key={indx} className='flex justify-between px-4 text-sm h-10 items-center'>

              <div className='flex gap-3 items-center'>
                <MdOutlineOndemandVideo className='size-4' />
                <h3>{lecture?.title}</h3>
              </div>

              <h3>{lecture?.duration && (lecture?.duration / 60).toFixed(1) + "min"}</h3>

            </div>
          ))}

        </div>
      )}

    </>
  )
}

const ShowMorePara = ({ value }) => {
  const [show, setShow] = useState(false);

  return (
    <div className='space-y-4'>
      <p className='text-sm relative '>
        {
          show ? value : value?.slice(0, 750)
        }

        {!show && <div className='h-[70%] absolute w-[100%] bottom-0  bg-gradient-to-t from-white to-transparent'></div>}

      </p>

      <div onClick={() => setShow(!show)} className='flex gap-1 text-blue-700 cursor-pointer hover:text-blue-900 duration-150 '>
        <button className='font-bold text-sm'>Show {show ? "less" : "more"}</button>
        <MdKeyboardArrowDown className={`size-4 mt-auto ${show && "rotate-180"} duration-150`} />
      </div>

    </div>
  )

}

function CourseView() {
  const { course_id } = useParams();

  const dispatch = useDispatch();

  const data = useSelector((state) => state?.course?.content);

  const [expandAll, setExpandAll] = useState(false);
  console.log(expandAll);

  // console.log(data);



  useEffect(() => {
    dispatch(courseDetail({ course_id }));
  }, [])




  return (
    <HomeLayout>

      {/* Card */}
      <div className='absolute right-20 top-28 z-20 h-[75%] '>

        <div className=' bg-white  sticky top-7 border  text-[#2D2F31] w-[340px] shadow-2xl'>

          {/* video */}
          <div className='relative p-[0.2px] h-44 w-full cursor-pointer group'>

            <video className='h-full w-full object-cover  ' poster={data?.thumbnail?.secure_url} src={data?.trailerVideo?.secure_url} />

            <div className='absolute left-[40%] top-[30%] bg-white p-4 rounded-full z-10 group-hover:scale-105 duration-300'>
              <GrPlayFill className='size-7' />
            </div>

            <div className='h-full w-full  absolute top-0 bg-gradient-to-t from-black to-transparent  ' ></div>

            <h3 className='text-white font-bold absolute left-[30%] bottom-4'>Preview this Course</h3>

          </div>

          <div className='p-5 space-y-4'>

            <div className='flex items-center gap-2'>
              <h2 className='text-2xl font-bold'>₹{data?.price}  </h2>
              <h3 className='font-normal text-base line-through text-[#6A6F73]'>₹{Math.floor(((data?.price*100)/20)) }</h3>
              <h3 className='font-normal text-base'>80% off</h3>
            </div>


            <div className='flex items-center h-12 justify-between'>
              <button className='font-bold w-[75%] h-full bg-blue-600 text-white hover:bg-blue-700 duration-150'>Add to cart</button>
              <button className='border border-black h-full w-[20%] hover:bg-[#E3E7EA] duration-150 '><FaRegHeart className='size-5 m-auto' /></button>
            </div>

            <div className='space-y-1'>
              <h3 className='text-center text-xs'>30-Day Money-Back Guarantee</h3>
              <h3 className='text-center text-xs'>Full Lifetime Access</h3>
            </div>

          </div>

        </div>

      </div>

      <div className='bg-[#1C1D1F] w-full h-16 fixed top-0 text-white p-3 shadow-2xl z-10'>
        <h1 className='font-bold'>{data?.title}</h1>
        <div className='text-[#F69C08] flex text-sm gap-2'>
          <h4 >{4.7}</h4>
          <Rating total={4.7} color='#F69C08' flag={false} />
          <h4 className='text-[#C0C4FC] underline'>(3,479 ratings)</h4>
          <h4 className='text-white'>15,266 students</h4>
        </div>
      </div>

      <div className='bg-[#1C1D1F]  px-20 py-10 text-white '>

        <div className='w-[65%] space-y-5'>
          <h5 className='text-[#C0C4FC] font-bold'> {data?.category?.charAt(0).toUpperCase() + data?.category?.slice(1)} </h5>

          <h1 className='text-3xl font-bold'>{data?.title}</h1>

          <h3 className='font-semibold text-lg'> {data?.subtitle} </h3>

          <div className='text-[#F69C08] flex text-sm gap-2'>
            <h4 >{4.7}</h4>
            <Rating total={4.7} color='#F69C08' flag={false} />
            <h4 className='text-[#C0C4FC] underline'>(3,479 ratings)</h4>
            <h4 className='text-white'>15,266 students</h4>
          </div>

          <h3 className='text-sm'>Created by <span className='text-[#C0C4FC] underline'>{data?.instructor?.username}</span></h3>

          <div className='flex gap-2 items-center text-sm'>
            <IoIosAlert />
            <h3>Last updated 11/2024</h3>
            <TbWorld />
            <h3>English</h3>
          </div>

        </div>

      </div>

      <div className='w-[70%] px-24 py-10 space-y-10 '>

        {/* what you'll learn */}
        <div className='py-6 px-6 border border-slate-300 space-y-3'>

          <h1 className='text-2xl font-bold '>What  you'll learn</h1>

          <div className='columns-2  text-sm space-y-1'>
            {
              data?.goals?.objectives?.map((value, indx) => <div key={indx} className='flex gap-2'><IoCheckmark className='size-4 flex-shrink-0 mt-1' /> {value}</div>)
            }
          </div>

        </div>

        {/* includes */}
        <div className='space-y-3'>
          <h1 className='text-2xl font-bold'>This course includes:</h1>

          <div className='columns-2 space-y-1'>
            <div className='flex items-center gap-3 flex-shrink-0'> <MdOutlineSmartDisplay /> 70.5 hours on-demand video</div>
            <div className='flex items-center gap-3 flex-shrink-0'><IoMdCode /> 45 coding exercises</div>
            <div className='flex items-center gap-3 flex-shrink-0'><FaRegFile />3 articles</div>
            <div className='flex items-center gap-3 flex-shrink-0'><RiFolderDownloadLine />20 downloadable resources</div>
            <div className='flex items-center gap-3 flex-shrink-0'><BiMobile />Access on mobile and TV</div>
            <div className='flex items-center gap-3 flex-shrink-0'><AiOutlineTrophy />Certificate of completion</div>
          </div>
        </div>

        {/* content */}

        <div>

          <h1 className='text-2xl font-bold'>Course content</h1>

          <div className='flex justify-between mt-5 text-sm'>
            <h1>31 sections • 202 lecutres • 70h 42m total length</h1>
            <button onClick={() => setExpandAll(!expandAll)} className='text-blue-700 font-bold hover:text-blue-900 duration-150'>{expandAll ? "Collapse" : "Expand"} all sections</button>
          </div>

          {/* sections */}

          <div className='my-6 border border-slate-300 '>
            {data?.sections?.map((section, indx) => <SectionDropDown key={indx} section={section} last={data?.sections?.length - 1 === indx} expandAll={expandAll} />
            )}
          </div>

        </div>

        {/* requirement */}
        <div className='space-y-4'>
          <h1 className='text-2xl font-bold'>Requirements</h1>

          <div className='space-y-1 text-sm'>
            {data?.goals?.prerequisites?.map((value, indx) => <div className='flex items-center gap-4' key={indx}><TbPointFilled />{value}</div>)}
          </div>

        </div>

        {/* description */}

        <div className='space-y-4'>

          <h1 className='text-2xl font-bold'>Description</h1>

          <ShowMorePara value={data?.description} />

        </div>

        {/* instructor */}

        <div className='space-y-2 pb-11'>
          <h1 className='text-xl text-blue-800 font-semibold underline underline-offset-4 '>{data?.instructor?.username}</h1>

          <h3 className='text-[#6A6F73]'>A teacher who loves to teach about Technology</h3>

          <div className='flex gap-5'>
            <img className='rounded-full size-24 ' src={data?.instructor?.image} alt="" />
            <ul className='text-sm space-y-1'>
              <li className='flex items-center gap-4'><LiaStarSolid className='flex-shrink-0 size-4' /> 4.7 Instructor Rating</li>
              <li className='flex items-center gap-4'><RiMedalLine className='flex-shrink-0 size-4' /> 3,522 Reviews</li>
              <li className='flex items-center gap-4'><MdPeople className='flex-shrink-0 size-4' /> 15,815 Students</li>
              <li className='flex items-center gap-4'><IoIosPlayCircle className='flex-shrink-0 size-4' /> 1 course</li>
            </ul>
          </div>

          <ShowMorePara value={data?.instructor?.bio} />

        </div>




      </div>




    </HomeLayout>
  );
}

export default CourseView;
