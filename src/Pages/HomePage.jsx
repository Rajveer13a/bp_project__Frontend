import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Carousel } from '@/components/Carousel'
import Tab from '@/components/Tab'
import { getAllCourses } from '@/Redux/Slices/CourseSlice';

function HomePage() {

  const dispatch = useDispatch();

  let data = useSelector((state) => state?.course?.data);

  const userCourses = useSelector((state) => state.auth.data.purchasedCourses);

  const filteredData = useMemo(() => {
    return data?.filter((value) => !userCourses?.includes(value?._id));
}, [data, userCourses]);
  
  const categories  = ["Web Development","Data Science", "IT Certifications", "Leadership","Communication","Business Analytics & Intelligence"]

  const [active, setActive] = useState("Web Development")

  useEffect(() => {
    dispatch(getAllCourses());
  }, [])

  return (

    <>

      <Carousel time={10000} autoSlide={true} />

      <div className='px-10 py-12 space-y-3'>
        <h1 className='merriweather-bold text-4xl'>All the skills you need in one place</h1>
        <p className='text-lg text-slate-800'>From critical skills to technical topics, Udemy supports your professional development.</p>
      </div>



      <div className='pb-16 pt-5  '>

        <ul className='flex text-base font-bold gap-6 border-b mb-10  h-[40px] mx-10 cursor-pointer'>
          {categories?.map((value,indx)=>{
            return (
              <li onClick={()=>setActive(value)}  key={indx} className={`${active != value && "text-slate-500"  } relative px-1 hover:text-black transition-all duration-75 `}>
                {value}
                <div className={`absolute w-[100%] h-[2px] bg-black bottom-0 left-0 opacity-0  ${active == value && "opacity-100"} duration-100 transition-opacity`}></div>
              </li>
            )
          }   )}
        </ul>

        <Tab data={filteredData} />

         <button className='border border-black p-2 font-bold mx-10 mt-14 hover:bg-slate-100 transition-colors duration-100'>Show all {active} Courses</button> 

      </div>


       <div className='space-y-5 py-8 mb-16'>
        
          <h1 className='text-center text-[#6A6F73] text-lg'>Trusted by over 16,000 companies and millions of learners around the world</h1>

          <div className='flex justify-evenly '>
            <img src="https://cms-images.udemycdn.com/content/tqevknj7om/svg/volkswagen_logo.svg?position=c&quality=80&x.app=portals" alt="" />
            <img src="https://cms-images.udemycdn.com/content/2gevcc0kxt/svg/samsung_logo.svg?position=c&quality=80&x.app=portals" alt="" />
            <img src="https://cms-images.udemycdn.com/content/mueb2ve09x/svg/cisco_logo.svg?position=c&quality=80&x.app=portals" alt="" />
            <img src="https://cms-images.udemycdn.com/content/ryaowrcjb2/svg/vimeo_logo_resized-2.svg?position=c&quality=80&x.app=portals" alt="" />
            <img src="https://cms-images.udemycdn.com/content/bthyo156te/svg/procter_gamble_logo.svg?position=c&quality=80&x.app=portals" alt="" />
            <img src="https://cms-images.udemycdn.com/content/luqe0d6mx2/svg/hewlett_packard_enterprise_logo.svg?position=c&quality=80&x.app=portals" alt="" />
            <img src="https://cms-images.udemycdn.com/content/siaewwmkch/svg/citi_logo.svg?position=c&quality=80&x.app=portals" alt="" />
            <img src="https://cms-images.udemycdn.com/content/swmv0okrlh/svg/ericsson_logo.svg?position=c&quality=80&x.app=portals" alt="" />
          </div>
          
        </div>   


    </>

  )
}

export default HomePage
