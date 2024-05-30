import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { getAllCourses } from '@/Redux/Slices/CourseSlice';

import Rating from './Rating';
import { Button } from './ui/button'

function Tab() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const courses = useSelector((state) => state.course.data);

    const [tab, setTab] = useState("web-development");

    function getCourses() {
        dispatch(getAllCourses());
    }
    console.log(courses);
    useEffect(getCourses, [])

    const tabs = [
        {
            label: "Web Development",
            data: courses
        },
        {
            label: "IT Certificates",
            data: [
                {
                    courseName: "The Complete 2024 Web Development Bootcamp",
                    instuctor: "Dr. Angela Yu",
                    rating: 4.5,
                    price: "₹549",
                    image: "https://pwskills.com/_next/image/?url=https%3A%2F%2Fcdn.pwskills.com%2Fassets%2Fuploads%2Fthumbnails%2F6568179250c244fbec73aaf4.png&w=828&q=75"
                },
                {
                    courseName: "The Complete 2024 Web Development Bootcamp",
                    instuctor: "Dr. Angela Yu",
                    rating: 4.5,
                    price: "₹549",
                    image: "https://pwskills.com/_next/image/?url=https%3A%2F%2Fcdn.pwskills.com%2Fassets%2Fuploads%2Fthumbnails%2F65c7381571938981dff646db.png&w=828&q=75"
                },
                {
                    courseName: "The Complete 2024 Web Development Bootcamp",
                    instuctor: "Dr. Angela Yu",
                    rating: 4.5,
                    price: "₹549",
                    image: "https://pwskills.com/_next/image/?url=https%3A%2F%2Fcdn.pwskills.com%2Fassets%2Fuploads%2Fthumbnails%2F660a53ec9709e67e9c23973d.png&w=828&q=75"
                },
                {
                    courseName: "The Complete 2024 Web Development Bootcamp",
                    instuctor: "Dr. Angela Yu",
                    rating: 4.5,
                    price: "₹549",
                    image: "https://pwskills.com/_next/image/?url=https%3A%2F%2Fcdn.pwskills.com%2Fassets%2Fuploads%2Fthumbnails%2F6568179250c244fbec73aaf4.png&w=828&q=75"
                },
                {
                    courseName: "The Complete 2024 Web Development Bootcamp",
                    instuctor: "Dr. Angela Yu",
                    rating: 4.5,
                    price: "₹549",
                    image: "https://pwskills.com/_next/image/?url=https%3A%2F%2Fcdn.pwskills.com%2Fassets%2Fuploads%2Fthumbnails%2F6568179250c244fbec73aaf4.png&w=828&q=75"
                },
                {
                    courseName: "The Complete 2024 Web Development Bootcamp",
                    instuctor: "Dr. Angela Yu",
                    rating: 4.5,
                    price: "₹549",
                    image: "https://pwskills.com/_next/image/?url=https%3A%2F%2Fcdn.pwskills.com%2Fassets%2Fuploads%2Fthumbnails%2F6568179250c244fbec73aaf4.png&w=828&q=75"
                },
                {
                    courseName: "The Complete 2024 Web Development Bootcamp",
                    instuctor: "Dr. Angela Yu",
                    rating: 4.5,
                    price: "₹549",
                    image: "https://pwskills.com/_next/image/?url=https%3A%2F%2Fcdn.pwskills.com%2Fassets%2Fuploads%2Fthumbnails%2F6568179250c244fbec73aaf4.png&w=828&q=75"
                },

            ]
        },


    ]

    return (
        <>
            <div role="tablist" className="tabs tabs-bordered tabs-lg">

                <input onClick={() => { setTab("A1") }} type="radio" name="my_tabs_1" role="tab" className="tab text-nowrap hover:text-black" aria-label={"A1"} checked />

                {
                    tabs?.map(
                        (value, indx) => {
                            return <>
                                <input type="radio" name="my_tabs_1" role="tab" className="tab text-nowrap hover:text-black" aria-label={value.label} checked={indx == 0 ? true : undefined} />

                                <div role="tabpanel" className="w-[37.5%] tab-content p-10 lg:w-[96.5%] ml-[6.5px]">

                                    <Carousel
                                        opts={{
                                            align: "start",
                                        }}
                                        className="w-full "
                                    >
                                        <CarouselContent>
                                            {value.data.map((course, index) => (
                                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 ">
                                                    <div className="p ">

                                                        <Link to={`/course/${course._id}`}>
                                                            <div className="card  bg-base-100 shadow-md transform hover:scale-105 transition-transform duration-300 hover:shadow-lg  ">
                                                                <figure><img className='h-[162px]' src={course.thumbnail?.secure_url} alt="" /></figure>
                                                                <div className="card-body  w-[158px] h-[245px]">
                                                                    <p2 className="card-title line-clamp-2 w-[190%] ">
                                                                        {course.title}

                                                                    </p2>
                                                                    <p>{course?.instructor?.username}</p>

                                                                    <Rating />

                                                                    <p className='font-semibold text-lg'>₹ {course.price}</p>

                                                                    <div className="card-actions justify-end">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious onclick={() => { console.log("hello") }} />
                                        <CarouselNext />
                                    </Carousel>

                                </div>


                            </>
                        }
                    )
                }



            </div>


            <div className='h-[140px]'>
                <Button variant="bghost" size="lg" className={"p-6 ml-[48px] text-lg font-semibold"}  >Show all X courses </Button>
            </div>


        </>
    )
}

export default Tab
