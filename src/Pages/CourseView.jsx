import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Rating from '@/components/Rating';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordionView"
import { Button } from '@/components/ui/button';
import HomeLayout from '@/Layouts/HomeLayout';
import { courseDetail } from '@/Redux/Slices/CourseSlice';
import { updateCart } from '@/Redux/Slices/UserConfigSlice';


function CourseView() {
  const { course_id } = useParams();

  const learnings = [
    "Ethical hacking is a good career because it is one of the best ways to test a network.",
    "Ethical hacking involves a hacker agreeing with an organization or individual who authorizes the hacker to levy cyber attacks on a system or network.",
    "In addition to proficiency in basic computer skills and use of the command line, ethical hackers must also develop technical skills.",
    "Many hackers use the Linux operating system (OS) because Linux is a free and open-source OS, meaning that anyone can modify it.",
    "Ethical hacking is legal because the hacker has full, expressed permission to test the vulnerabilities of a system.",
    "The different types of hackers include white hat hackers who are ethical hackers and are authorized to hack systems, black hat hackers.",
    "Whether you want to get your first job in IT security, become a white hat hacker, or prepare to check the security of your own home network.",
    "Penetration testing skills make you a more marketable IT tech. Understanding how to exploit servers, networks, and applications.",
    "Penetration tests have five different stages. The first stage defines the goals and scope of the test and the testing methods that will be used.",
    "There are many types of penetration testing. Internal penetration testing tests an enterprise's internal network."
  ];

  const data = useSelector((state) => state.course.content);

  const cart = useSelector((state)=> state.config.cart);

  const inCart = cart.some( (value)=> value._id=== course_id);

  console.log(inCart)

  const sections = data?.sections?.length;

  const lectures = data?.sections?.reduce((total, sections) => total + sections?.lectures?.length, 0);

  // const lectures = data?.sections.reduce( (total, sections)=>{
  //   return total +
  // } )





  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  const [showMoreDes, setShowMoreDes] = useState(false);

  const [showMoreBio, setShowMoreBio] = useState(false);

  function addToCart(id,courseDetail){
    dispatch( updateCart([
      {
        add: id
      },
      courseDetail
    ]) )
  }


  useEffect(() => {
    dispatch(courseDetail({ course_id }));
    window.scrollTo(0, 0);
  }, [dispatch, course_id]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <HomeLayout>

      <div className=' absolute top-0'>
        <div className='bg-neutral h-[84px] pt-3 pl-6 w-[100%] sticky top-0 text-white shadow-xl z-20'>

          <h1 className='text-lg font-bold'>
            {data?.title}
          </h1>
          <div className='flex items-center gap-1 text-sm'>
            <div className='text-yellow-300'>4.4</div>
            <Rating className={'w-[5%]'} />
            <div className='text-blue-400'>(1,981 ratings)</div>
            <div>14676 students</div>

          </div>
        </div>


        <div className='bg-neutral text-white flex'>
          <div className='p-16 w-[70%] flex-col space-y-5'>
            <h1 className='text-4xl font-bold'>{data.title}</h1>
            <p className='text-xl'>{data?.subtitle}</p>
            <div className='flex items-center gap-1 text-sm'>
              <div className='text-yellow-300'>4.4</div>
              <Rating className={'w-[10%]'} />
              <div className='text-blue-400'>(1,981 ratings)</div>
              <div>14676 students</div>
              <div className='text-blue-400 underline'>Created by {data?.instructor?.username}</div>
            </div>
          </div>

        </div>

        <div className='absolute top-24 h-[85%] right-8'>
          <div className="card w-96 bg-base-100 shadow-xl sticky top-2  h-[415px] z-40  ">
            <figure><img className=' w-full' src={data?.thumbnail?.secure_url} alt="" /></figure>
            <div className="card-body">


              <p className='font-bold text-2xl'>  ₹ {data?.price} </p>
              <div className="card-actions justify-center mt-4 ">
                {
                  inCart ? (
                    <Link className='w-full' to={"/shoppingCart"}>
                      <Button variant="bghost" className="w-full h-12 font-bold text-lg rounded-sm text-white bg-blue-600 r hover:bg-blue-700  hover:text-white border-none" size="new" >
                      Go to Cart
                    </Button> 
                    </Link>
                  ): (
                    <Button onClick={()=> addToCart(data?._id , data)} variant="bghost" className="w-full h-12 font-bold text-lg rounded-sm" size="new" >Add to Cart</Button>
                  )
                }
              </div>
              <p className='font-normal text-xs text-center'>  30-Day Money-Back Guarantee <br />
                Full Lifetime Access </p>
            </div>
          </div>
        </div>



        <div className='border border-opacity-25 border-black ml-20 mt-10 w-[60%] p-5'>
          <h1 className='font-bold text-2xl'>What you'll learn</h1>
          <div className={`show-more-container ${showMore ? 'show-more-expanded' : ''}`}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-7'>
              {(showMore ? learnings : learnings.slice(0, 6)).map((item, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-base  flex-1">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={toggleShowMore}
            className='mt-4 text-blue-400 underline'
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        </div>

        <div className='ml-20 mt-10 w-[60%]'>

          <h1 className='font-bold text-2xl'>Course content </h1>

          <p className='mt-4 flex items-center'>
            {sections} sections <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            </svg> {lectures} lectures
          </p>

          <div className='border border-black border-opacity-15 mt-4  bg-gray-100'>
            <Accordion type="single" collapsible>

              {
                data?.sections ? (
                  data?.sections.map((section, indx) => {
                    return (
                      <AccordionItem key={indx} value={`item-${indx + 1}`}>
                        <AccordionTrigger> {section?.title} here </AccordionTrigger>
                        {
                          section?.lectures ? (
                            section?.lectures.map((lecture, indx) => {
                              return (
                                <AccordionContent key={indx}>
                                  {lecture?.title}
                                </AccordionContent>
                              )
                            })
                          ) : ""
                        }
                      </AccordionItem>
                    )
                  })
                ) : ""
              }

            </Accordion>

          </div>



        </div>

        <div className='ml-20 mt-10 w-[60%] min-h-40 mb-9'>
          <h1 className='text-2xl font-semibold'>
            Description
          </h1>


          <p className={` pt-4 font-medium show-more-container ${showMoreDes ? 'show-more-expanded' : ''}`}>
            {
              data && (
                showMoreDes ? data?.description : data?.description?.slice(0, 355)
              )
            }
          </p>
          <button onClick={() => { setShowMoreDes(!showMoreDes) }}
            className='mt-4 text-blue-400 underline'>
            {showMoreDes ? 'Show less' : 'Show more'}
          </button>
        </div>


        {
          data && (
            <div className='ml-20 mt-10 w-[60%] space-y-2 mb-14' >
              <h1 className='font-semibold text-2xl' >
                Instuctor
              </h1>

              <div className=''>
                <h2 className='underline text-xl text-blue-500 font-semibold'>
                  {data?.instructor?.username}
                </h2>

                <div className='flex items-center gap-7 text-sm font-semibold'>

                  <div className="avatar my-3">
                    <div className="w-28 rounded-full">
                      <img src={data?.instructor?.image} />
                    </div>
                  </div>

                  <div>
                    <ul className='space-y-1'>

                      <li className='flex items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        4.4 Instructor Rating
                      </li>

                      <li className='flex items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award-fill" viewBox="0 0 16 16">
                          <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z" />
                          <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                        </svg>
                        62,315 Reviews
                      </li>

                      <li className='flex items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                        436,769 Students
                      </li>

                      <li className='flex items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>
                        330 Courses
                      </li>

                    </ul>
                  </div>

                </div>

                <p className={` pt-4 font-medium show-more-container ${showMoreBio ? 'show-more-expanded' : ''}`}>
                  {
                    showMoreBio ? data?.instructor?.bio : data?.instructor?.bio?.slice(0, 325)
                  }
                </p>

                <button onClick={() => { setShowMoreBio(!showMoreBio) }}
                  className='mt-4 text-blue-400 underline'>
                  {showMoreBio ? 'Show less' : 'Show more'}
                </button>

              </div>
            </div>
          )
        }
      </div>



    </HomeLayout>
  );
}

export default CourseView;
