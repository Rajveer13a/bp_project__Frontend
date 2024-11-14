import { useEffect, useRef, useState } from "react"
import { IoChevronForwardCircle } from "react-icons/io5";

export function Carousel({ time = 5000, autoSlide = true }) {

    const cardContent = [
        {
            image: "https://img-c.udemycdn.com/notices/web_carousel_slide/image/a5f2c3b6-fbad-42a9-be8a-5f430ed2d4f9.jpg",
            heading: "Skills for your future",
            text: "Expand your potential with a course. Starting at just ₹549 through June 5."
        },
        {
            image: "https://img-c.udemycdn.com/notices/featured_carousel_slide/image/3ec4a7a2-a96f-4671-a784-462bdcb1afcc.jpg",
            heading: "We’ll get you to your goals",
            text: "Go from beginner to advanced in the topic of your choice. Courses from ₹549 through May 8."
        },
        {
            image: "https://img-c.udemycdn.com/notices/web_carousel_slide/image/beeee76b-b4f1-4dbc-a165-c825285f6fbb.jpg",
            heading: "We’ll get you to your goals",
            text: "Go from beginner to advanced in the topic of your choice. Courses from ₹549 through May 8."
        },
        {
            image: "https://img-c.udemycdn.com/notices/web_carousel_slide/image/3cde0b2b-6a65-4627-acb6-f84fa1895a76.jpg",
            heading: "We’ll get you to your goals",
            text: "Go from beginner to advanced in the topic of your choice. Courses from ₹549 through May 8."
        },
        {
            image: "https://img-c.udemycdn.com/notices/web_carousel_slide/image/3386029b-4e1c-4114-8e12-c0851a375545.png",
            heading: "Sale ends today",
            text: "But there’s no limit on your skills with courses as low as ₹549."
        },


    ]

    const [currentIndex, setIndex] = useState(0);

    const nextSlide = () => {

        setIndex((prevIndex) => (prevIndex + 1) % cardContent.length);
    }

    const prevSlide = () => {

        setIndex((prevIndex) => prevIndex == 0 ? cardContent.length - 1 : prevIndex - 1);
    }

    const intervalId = useRef(null);


    const stopAutoSlide = () => {
        clearInterval(intervalId?.current);
        intervalId.current = null;
    }

    const startAutoSlide = () => {
        if (!intervalId.current) {
            intervalId.current = setInterval(() => nextSlide(), time);
        }
    }

    useEffect(() => {
        if (autoSlide) intervalId.current = setInterval(() => nextSlide(), time);

        return () => stopAutoSlide();

    }, [])

    console.log(intervalId.current)



    return (
        <div onMouseEnter={autoSlide && stopAutoSlide} onMouseLeave={autoSlide && startAutoSlide} className="relative overflow-hidden">

            <div className="flex transition-transform duration-700 animate-out" style={{
                transform: `translateX(-${currentIndex * 100}%)`
            }}>
                {
                    cardContent?.map((value, indx) => {
                        return <div key={indx} className="relative flex-shrink-0 w-[100%]">
                            <img src={value?.image} className="w-full" />
                            <div className="  w-[400px] bg-white top-[25%] left-[10%] shadow-2xl  absolute  p-6 border space-y-3">
                                <h1 className="text-3xl text-[#2D2F31] merriweather-bold">{value?.heading}</h1>
                                <p className="text-lg">{value?.text}</p>
                            </div>
                        </div>
                    })
                }
            </div>

            
            <div className="absolute bottom-1 left-[48%] flex gap-4 items-center ">
                {
                   cardContent.map((val,indx)=> <div key={indx} className={` bg-white rounded-full border ${currentIndex==indx ? "size-3" : "size-2 opacity-50"} transition-all duration-150`}></div>)
                }
            </div>


            <div onClick={prevSlide} className="cursor-pointer">
                <IoChevronForwardCircle className="absolute size-11 top-[50%] left-10 z-10 fill-slate-900 hover:fill-slate-800 rotate-180" />
                <div className="absolute size-8 top-[52%] left-12 bg-white rounded-full  "></div>
            </div>

            <div onClick={nextSlide} className="cursor-pointer">
                <IoChevronForwardCircle className="absolute size-11 top-[50%] right-10 z-10 fill-slate-900 hover:fill-slate-800" />
                <div className="absolute size-8 top-[52%] right-12 bg-white rounded-full  "></div>
            </div>

        </div>
    )
}
