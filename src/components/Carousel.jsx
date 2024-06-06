import Autoplay from "embla-carousel-autoplay"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselPlugin() {

    const cardContent =[
                {
            image:"https://img-c.udemycdn.com/notices/web_carousel_slide/image/a5f2c3b6-fbad-42a9-be8a-5f430ed2d4f9.jpg",
            heading:"Skills for your future",
            text:"Expand your potential with a course. Starting at just ₹549 through June 5."
        },
                {
            image:"https://img-c.udemycdn.com/notices/featured_carousel_slide/image/3ec4a7a2-a96f-4671-a784-462bdcb1afcc.jpg",
            heading:"We’ll get you to your goals",
            text:"Go from beginner to advanced in the topic of your choice. Courses from ₹549 through May 8."
        },
                {
            image:"https://img-c.udemycdn.com/notices/web_carousel_slide/image/beeee76b-b4f1-4dbc-a165-c825285f6fbb.jpg",
            heading:"We’ll get you to your goals",
            text:"Go from beginner to advanced in the topic of your choice. Courses from ₹549 through May 8."
        },
                {
            image:"https://img-c.udemycdn.com/notices/web_carousel_slide/image/beeee76b-b4f1-4dbc-a165-c825285f6fbb.jpg",
            heading:"We’ll get you to your goals",
            text:"Go from beginner to advanced in the topic of your choice. Courses from ₹549 through May 8."
        },
        
        
    ]


  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[100%]  "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {cardContent.map((value, index) => (
          <CarouselItem key={index} >
            <div className="relative">
              
              <img className="" src={value.image} />
              <div className="hidden md:block   bg-white absolute top-[60px] left-[85px] w-[420px] h-[180px] shadow-lg ">
                    <h1 className="text-3xl text- font-semibold font-serif px-6 pt-6">{value.heading}</h1>
                    <h4 className="px-7 pt-3"> {value.text} </h4>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={"ml-[70px]"} />
      <CarouselNext className={"mr-[70px]"} />
    </Carousel>
  )
}
