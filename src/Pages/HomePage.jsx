import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Carousel } from '@/components/Carousel'
import Tab from '@/components/Tab'
import HomeLayout from '@/Layouts/HomeLayout'
import { getAllCourses } from '@/Redux/Slices/CourseSlice';

function HomePage() {

  const dispatch = useDispatch();

  const data = useSelector((state) => state?.course?.data);
  
  useEffect(() => {
    dispatch(getAllCourses());
  }, [])

  return (

    <HomeLayout>

      <Carousel time={10000} autoSlide={true} />



      <div className='pb-80 pt-5  '>
        <Tab data={data} />
      </div>



    </HomeLayout>

  )
}

export default HomePage
