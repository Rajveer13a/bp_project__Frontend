import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Rating from '@/components/Rating';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import HomeLayout from '@/Layouts/HomeLayout';
import { courseDetail } from '@/Redux/Slices/CourseSlice';


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

  const sections = data?.sections?.length;

  const lectures = data?.sections?.reduce((total, sections) => total + sections?.lectures?.length, 0);

  // const lectures = data?.sections.reduce( (total, sections)=>{
  //   return total +
  // } )





  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    dispatch(courseDetail({ course_id }));
    window.scrollTo(0, 0);
  }, [dispatch, course_id]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <HomeLayout>
      <div className='bg-neutral text-white'>
        <div className='p-16 w-[70%] flex-col space-y-5'>
          <h1 className='text-4xl font-bold'>{data.title}</h1>
          <p className='text-xl'>{data.description}</p>
          <div className='flex items-center gap-1 text-sm'>
            <div className='text-yellow-300'>4.4</div>
            <Rating className={'w-[10%]'} />
            <div className='text-blue-400'>(1,981 ratings)</div>
            <div>14676 students</div>
            <div className='text-blue-400 underline'>Created by {data?.instructor?.username}</div>
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
              data?.sections.map((section,indx)=>{
                return (
                  <AccordionItem key={indx} value={`item-${indx+1}`}>
                <AccordionTrigger> {section?.title} here </AccordionTrigger>
                {
                  section?.lectures ? (
                    section?.lectures.map((lecture,indx)=>{
                      return(
                        <AccordionContent key={indx}>
                      {lecture?.title}
                    </AccordionContent>
                      )
                    })
                  ): ""
                }
              </AccordionItem>
                )
            }) 
            ): ""
          }

          </Accordion>

        </div>



      </div>

      <div className='ml-20 mt-10 w-[60%] min-h-40'>
        <h1 className='text-2xl font-semibold'>
          Description
        </h1>
        <p className='pt-4 font-medium'>
          {
            data && data?.description
          }
        </p>
      </div>


    </HomeLayout>
  );
}

export default CourseView;
