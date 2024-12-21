import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { GrPlayFill } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Rating from '@/components/Rating';
import { mylearning } from '@/Redux/Slices/CourseSlice';

const Courses = ({ data }) => {

  const percentage = 4;

  return (
    <>
      {data?.map((value, indx) => {
        return (
          <Link to={`/learn/lecture/${value?._id}`} key={indx} className=' w-56 space-y-1 cursor-pointer group block'>

            <div className='relative h-32'>

              <img className='border border-slate-300 w-full h-full object-cover' src={value?.thumbnail?.secure_url} alt="" />


              <div className='flex bg-black h-full w-full absolute top-0 opacity-0  group-hover:opacity-55  duration-200 '></div>

              <div className={`absolute left-[40%] top-[30%] bg-white p-3 opacity-0 rounded-full z-10 group-hover:opacity-100 duration-200 `}>
                <GrPlayFill className='size-5' />
              </div>

            </div>

            <h3 className='font-bold line-clamp-2 h-[47px] '>
              {value?.title}
            </h3>

            <div className=''>
              <h5 className='text-xs text-slate-600'>
                {value?.instructor?.username}
              </h5>

              <div className='h-[2px] bg-slate-300 mt-4 relative'>

                <div style={{
                  width: `${percentage}%`
                }} className='absolute h-full bg-blue-900'></div>
              </div>

              <div className='flex justify-between'>
                <h5 className='text-xs mt-[5px]'>{percentage}% complete</h5>

                <div className='text-xs mt-1 flex flex-col items-end'>
                  <Rating total={0} flag={false} />
                  <h5>Leave a rating</h5>
                </div>
              </div>

            </div>

          </Link>
        )
      })}


    </>
  )
}

const Whislist = () => {

  const { favourite: data } = useSelector((state) => state.config);

  return (
    <>
      {data?.map((value, indx) => {
        return (
          <Link to={`/course/${value?._id}`} key={indx} className=' w-56 space-y-1 cursor-pointer group block'>

            <div className='relative h-32'>

              <img className='border border-slate-300 w-full h-full object-cover' src={value?.thumbnail?.secure_url} alt="" />


              <div className='flex bg-black h-full w-full absolute top-0 opacity-0  group-hover:opacity-25  duration-200 '></div>
              <FaHeart className='fill-white absolute top-2 right-2 size-7' />

            </div>

            <h3 className='font-bold line-clamp-2 h-[47px] '>
              {value?.title}
            </h3>

            <div className='space-y-[1px]'>

              <h5 className='text-xs text-slate-600'>
                {value?.instructor?.username}
              </h5>

              <div className='flex text-sm items-center gap-1'>
                <h3 className='font-bold'>4.7</h3>
                <Rating total={4.7} flag={false} />
                <h3 className='text-slate-600 text-xs'>(277,110)</h3>
              </div>

              <h3 className='text-xs text-slate-600'> 74 total hours • 731 lectures</h3>

              <h2 className='font-bold space-x-1'><span>₹{value?.price}</span> <span className='font-normal line-through text-[#6A6F73] text-sm'>₹{Math.floor(((value?.price * 100) / 20))}</span></h2>



            </div>

          </Link>
        )
      })}
    </>
  )

}

function Learning() {

  const { active } = useParams();
  
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.course?.mylearning);

  const [tab, setTab] = useState(active=="learning" ? 0 : 1);

  useEffect(()=>{
    setTab(active=="learning" ? 0 : 1);
  },[active])

  useEffect(() => {

    dispatch(mylearning());

  }, [])


  return (
    <>

      <div className='bg-[#1C1D1F]  px-36 text-white '>

        <h1 className='text-4xl merriweather-black py-12'>My learning</h1>

        <div className="font-bold flex gap-5 pb-3 cursor-pointer">
          <Link 
            to={"/my-courses/learning"}
            className={`relative px-2 ${tab === 0 ? 'active-tab' : 'text-slate-300'} duration-100`}
          >
            All Courses
          </Link>
          <Link to={"/my-courses/wishlist"}
            className={`relative px-2 ${tab === 1 ? 'active-tab' : 'text-slate-300'} duration-100`}
          >
            Wishlist
          </Link>
        </div>



      </div>

      <div className='pt-10 px-36 grid grid-cols-4 gap-10 pb-28 '>

        {
          tab === 0 ? (
            <Courses data={data} />
          ) : (
            <Whislist data={data} />
          )
        }

      </div>



    </>
  )
}

export default Learning;
