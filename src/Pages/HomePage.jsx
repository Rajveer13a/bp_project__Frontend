import React, { useEffect, useMemo, useState } from 'react'
import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Carousel } from '@/components/Carousel'
import Tab from '@/components/Tab'
import { getAllCourses } from '@/Redux/Slices/CourseSlice';
import { CollaborativeRecommendations, coursesByCategory, TopicBasedRecommendations } from '@/Redux/Slices/searchSlice';
import { Link } from 'react-router-dom';

function HomePage() {

  const dispatch = useDispatch();

  let data = useSelector((state) => state?.course?.data);

  const userCourses = useSelector((state) => state.auth.data.purchasedCourses);

  const CollaborativeRecommendationsData = useSelector((state) => state.search.CollaborativeRecommendations);

  const TopicBasedRecommendationsData = useSelector((state) => state.search.TopicBasedRecommendations);

  const CategoryData = useSelector((state) => state.search.CategoryData);



  const filteredData = useMemo(() => {
    return data?.filter((value) => !userCourses?.includes(value?._id));
  }, [data, userCourses]);

  const categories = ["Web Development", "Data Science", "IT Certifications", "Leadership", "Communication", "Business Analytics & Intelligence"]

  const [active, setActive] = useState("Web Development")

  useEffect(() => {
    const user_id = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data"))._id : null;
    dispatch(coursesByCategory({
      searchTerm: active,
      user_id
    }))
  }, [active])

  useEffect(() => {
    dispatch(getAllCourses());

    const user_id = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data"))._id : null;

    dispatch(CollaborativeRecommendations({ user_id }));

    dispatch(TopicBasedRecommendations({ user_id }));
  }, [])

  return (

    <>

      <Carousel time={10000} autoSlide={true} />




      {/* CollaborativeRecommendations */}

      {
        CollaborativeRecommendationsData.length > 0 && (
          <div className='space-y-5 py-8'>

            <h1 className='text-2xl font-bold ml-10'>Learners are viewing</h1>

            <Tab data={CollaborativeRecommendationsData} />

          </div>
        )
      }

      <div className='px-10 py-12 space-y-3'>
        <h1 className='merriweather-bold text-4xl'>All the skills you need in one place</h1>
        <p className='text-lg text-slate-800'>From critical skills to technical topics, Udemy supports your professional development.</p>
      </div>


      <div className='pb-8 pt-5  '>

        <ul className='flex text-base font-bold gap-6 border-b mb-10  h-[40px] mx-10 cursor-pointer'>
          {categories?.map((value, indx) => {
            return (
              <li onClick={() => setActive(value)} key={indx} className={`${active != value && "text-slate-500"} relative px-1 hover:text-black transition-all duration-75 `}>
                {value}
                <div className={`absolute w-[100%] h-[2px] bg-black bottom-0 left-0 opacity-0  ${active == value && "opacity-100"} duration-100 transition-opacity`}></div>
              </li>
            )
          })}
        </ul>

        <Tab data={CategoryData[active] || []} />

        <Link to={`/search/${active}`}>
          <button className='border border-black p-2 font-bold mx-10 mt-14 hover:bg-slate-100 transition-colors duration-100'>Show all {active} Courses</button>
        </Link>

      </div>



      {/* by topics */}

      {
        TopicBasedRecommendationsData?.map((value, indx) => <div className='space-y-5 py-8 ' key={indx}>
          <h1 className='text-2xl font-bold ml-10'>Featured couses in  <span className='text-blue-800 underline underline-offset-2'>{value?.topic}</span></h1>

          <Tab data={value?.data} />
        </div>)
      }



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
