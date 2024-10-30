import { useState } from "react"
import { IoChevronForwardCircle } from "react-icons/io5";

export function Carousel() {

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
            heading: "We’ll get you to your goals",
            text: "Go from beginner to advanced in the topic of your choice. Courses from ₹549 through May 8."
        },


    ]


    const [current, setCurrent] = useState(0);

    const [sliding, setSliding] = useState(false);


    const nextSlide = ()=>{

        setSliding(true);

        setCurrent( (current+1) % cardContent.length );
    }

    const prevSlide = ()=>{

        setSliding(true);

        setCurrent(current === 0 ? cardContent.length - 1 : current - 1);
    }




    return (
        <div className="relative">
            <img onTransitionEnd={()=>setSliding(false)} src={cardContent[current].image} alt="" className={`${sliding && "translate-x-[100%] transition-all duration-700"} ease-in-out animate-in`} />

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
