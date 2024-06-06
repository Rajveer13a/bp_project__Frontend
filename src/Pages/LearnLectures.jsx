
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import Logo from '@/components/Logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordionLearn';
import { getlectures } from '@/Redux/Slices/CourseSlice';

function LearnLectures() {

  const { course_id } = useParams();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.course?.learn);

  const [video, setVideo] = useState("");

  console.log(video, "here","data->",data);

  const [showMoreBio, setShowMoreBio] = useState(false);
 
  useEffect(() => {
    dispatch(getlectures({ course_id }));


  }, []);

  useEffect(() => {
    if (data) {
      const firstLecture = data.sections[0]?.lectures[0];
      if (firstLecture) {
        setVideo({
          url: firstLecture?.resource?.secure_url,
          title: firstLecture?.title
        });
      }
    }
  }, [data]);


  return (

    <>


      <div className='bg-neutral h-16 text-white font-semibold text-xl flex space-x-5 items-center px-5'>
        <Logo />
        <h1>{data?.title}</h1>
      </div>

      <div className='flex w-full '>


        <div className='w-[75%]'>
          <div className='bg-[#2D2F31] w-full flex justify-center'>
            <video className='w-[80%] px-8' controls src={video?.url}></video>
          </div>

          <div className='bg-[#F7F9FA]'>

            <div className='font-semibold text-2xl py-8 '>

              <p className='border border-b-2 pl-10 h-14'>{video?.title}</p>

              <div className='border pl-10 border-b-2 h-[180px]'>

                <div className='flex items-center space-x-6 h-[80px] '>
                  <div>

                    <div className='flex justify-center items-center space-x-1' >
                      <p className='text-xl'>4.0</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFD700" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </div>

                    <div className='text-sm font-normal'>
                      91 rating
                    </div>

                  </div>


                  <div className='text-xl'>
                    16,303
                    <div
                      className='text-sm font-normal'>students</div>
                  </div>


                  <div className='text-xl'>
                    4 hours
                    <div className='text-sm font-normal'>
                      Total
                    </div>
                  </div>

                </div>

                <div className='flex items-center space-x-3'>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-exclamation-fill" viewBox="0 0 16 16">
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  <p className='text-lg'>Last updated March 2022</p>

                </div>

                <div className='flex items-center space-x-2'>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                  </svg>


                  <p className='text-lg'>
                    English
                  </p>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-heading" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                    <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                  </svg>
                  <p className='text-lg'>
                    English [Auto]
                  </p>

                </div>
              </div>

            </div>

          </div>

          <div className='bg-[#F7F9FA] space-y-4  ' >

            <div className='text-lg pl-10 flex space-x-28 border border-b-2 pb-4'>

              <p>
                By the numbers
              </p>

              <ul>
                <li>Skill level: Beginner Level</li>
                <li>Students: 16303  </li>
                <li>Language: English </li>
                <li>Captions: Yes</li>
              </ul>

              <ul>
                <li>Lectures: 23</li>
                <li>Video: 4 total hours</li>
              </ul>

            </div>

            <div className='text-lg'>

              <div className={`flex  pl-10  space-x-28  pr-6   ${showMoreBio ? 'border border-b-2 pb-4' : ''}`}>
                <p>
                  Description
                </p>

                <p className={` pt-4 show-more-container ${showMoreBio ? 'show-more-expanded' : ''}`}>
                  {data?.description}
                  {
                    showMoreBio ? data?.description : data?.description?.slice(0, 325)
                  }
                </p>
              </div>

              {
                showMoreBio ? (
                  <div className='text-lg pl-10 flex space-x-28  pb-4 pt-5'>
                    <p>
                      Instructor
                    </p>
                    <ul>
                      <li className='flex items-center space-x-5'>
                        <div className="avatar my-3">
                          <div className="w-20 rounded-full">
                            <img src={data?.instructor?.image} />
                          </div>
                        </div>
                        <p>
                          <b className='text-xl'>{data?.instructor?.username}</b> <br />
                          We are Security Enginners, who keeps the internt world safer
                        </p>
                      </li>
                      <li className='pr-6'>
                        {data?.instructor?.bio}
                      </li>
                    </ul>
                  </div>
                ) : ""
              }

              <button onClick={() => { setShowMoreBio(!showMoreBio) }}
                className='mt-4 pl-10 text-blue-400 underline'>
                {showMoreBio ? 'Show less' : 'Show more'}
              </button>


            </div>



          </div>


        </div>

        <div className=' w-[25%]  flex-col  '>

          <div className='sticky top-0  h-[100vh]'>

            <h1 className='font-bold text-xl pl-4 pt-5'>Couse content</h1>

            <div className='border border-black border-opacity-15 mt-4  bg-[#F7F9FA] overflow-scroll h-[100%] pb-10'>
              <Accordion type="single" collapsible>

                {
                  data?.sections ? (
                    data?.sections.map((section, indx) => {
                      return (
                        <AccordionItem key={indx} value={`item-${indx + 1}`}>
                          <AccordionTrigger className="font-bold">


                            <p className='text-left w-[92%]'>Section {indx + 1}:  {section?.title}</p>

                          </AccordionTrigger>
                          {
                            section?.lectures ? (
                              section?.lectures.map((lecture, indx) => {
                                return (
                                  <AccordionContent className={`hover:bg-[#D1D7DC] cursor-pointer ${
                                    video?.url === lecture?.resource?.secure_url ? "bg-[#D1D7DC]" : ""
                                  } `} onClick={() => setVideo(
                                    {
                                      url: lecture?.resource?.secure_url,
                                      title: lecture?.title
                                    }
                                  )} key={indx}>
                                    <input type="checkbox" className={`checkbox-xs border border-black `} />
                                    {indx + 1 + ". " + lecture?.title}
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

        </div>


      </div>






    </>


  )
}

export default LearnLectures
