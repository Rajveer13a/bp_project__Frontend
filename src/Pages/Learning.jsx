import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import HomeLayout from '@/Layouts/HomeLayout'
import { mylearning } from '@/Redux/Slices/CourseSlice';

function Learning() {

  const dispatch = useDispatch();

  const data = useSelector((state) => state?.course?.mylearning);

  useEffect(() => {

    dispatch(mylearning());

  }, [])


  return (
    <HomeLayout>
      <div className='bg-neutral h-[150px] text-white '>
        <h1 className='text-5xl  font-semibold pt-10 pl-24'>
          My learning
        </h1>
      </div>

      <div className=' p-10 px-36 gap-12  grid grid-cols-4'>

        {
          data?.map((value, indx) => {
            return (
              <Link to={`/learn/lectures/${value._id}`} key={indx}>
              <div className="card card-compact w-[230px] h-[250px] bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300">
                <figure>

                <div className="absolute inset-0 bg-black bg-opacity-50 h-32  flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-3 rounded-full shadow-lg">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 3.5l11 6.5-11 6.5v-13z" />
                      </svg>
                    </button>
                  </div>

                  <img  className="h-32 w-full" src={value?.thumbnail?.secure_url} alt="" />

                </figure>
                <div className="card-body">
                  <h2 className="card-title line-clamp-2 px-2"> {value?.title} </h2>

                  <p className='px-2'>
                    {value?.instructor?.username}
                  </p>

                </div>
              </div>
              </Link>
            )
          })
        }

      </div>



    </HomeLayout>
  )
}

export default Learning;
