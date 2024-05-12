import React, { useEffect, useState } from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from './ui/button'

function Tab() {

    const [ tab, setTab ] = useState("web-development");

    useEffect(()=>{console.log(tab)},[tab])

    const tabs = [
        {
            label: "Web Development",
            data: [
                {
                    courseName: "The Complete 2024 Web Development Bootcamp",
                    instuctor: "Dr. Angela Yu",
                    rating: 4.5,
                    price: "₹549",
                    image: "https://pwskills.com/_next/image/?url=https%3A%2F%2Fcdn.pwskills.com%2Fassets%2Fuploads%2Fthumbnails%2F6568179250c244fbec73aaf4.png&w=828&q=75"
                },
                {
                    courseName: "The ",
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

            <input onClick={ ()=>{ setTab("A1") }  } type="radio" name="my_tabs_1" role="tab" className="tab text-nowrap hover:text-black" aria-label={"A1"} checked />

                {
                    tabs?.map(
                        (value, indx) => {
                            return <>
                                <input type="radio" name="my_tabs_1" role="tab" className="tab text-nowrap hover:text-black" aria-label={value.label} checked={indx == 0 ? true : undefined} />

                                <div role="tabpanel" className="w-[27%] tab-content p-10 lg:w-[84%] ml-[6.5px]">

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

                                                        <div className="card  bg-base-100 shadow-md border ">
                                                            <figure><img className='h-[162px]' src={course.image} alt="" /></figure>
                                                            <div className="card-body w-[186px] h-[230px]">
                                                                <h2 className="card-title">
                                                                    {course.courseName}

                                                                </h2>
                                                                <p>{course.price}</p>
                                                                <div className="card-actions justify-end">

                                                                </div>
                                                            </div>
                                                        </div>

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
