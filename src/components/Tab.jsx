import React, {useState } from 'react'
import { IoChevronForwardCircle } from 'react-icons/io5';

import Card from './Card'

function Tab({ data }) {



  const [currentIndex, setCurrentIndex] = useState(0);

  const slideChange = 4

  const handleNext = () => {

    const remaining = data.length - currentIndex - 5;

    const increment = remaining >= 5 ? slideChange : remaining;

    if (remaining > 0) setCurrentIndex(currentIndex + increment);

  }

  const handlePrevious = () => {

    currentIndex - 5 > 0 ? setCurrentIndex(currentIndex - 5) : setCurrentIndex(0);

  }

  return (

    <div className='px-10  relative'>
      <div className=' border overflow-x-clip  w-[94vw] '>

        <div
          className={`flex gap-10 transition-transform duration-1000   animate-out  `}
          style={{
            transform: `translateX(-${currentIndex * (208 + 40)}px)`,
            width: data.length * (208 + 40)
          }}
        >
          {
            data?.map((course, indx) =>
              <Card key={indx}
                data={course}
                orignalPrice={2299}
                cnum={indx + 1}
                currentIndex={currentIndex}
              />)
          }
        </div>

      </div>
        
        {/* buttons */}

      <div onClick={handlePrevious} className={`absolute inline-block opacity-0 pointer-events-none top-[20%] left-4 z-10 cursor-pointer ${currentIndex != 0 && "opacity-100 pointer-events-auto"} transition-all duration-200`}>
        <IoChevronForwardCircle className="size-12 top-1 right-10 z-10 fill-slate-900 hover:fill-slate-800 rotate-180" />
        <div className="absolute size-9 -z-10  bg-white top-1.5 right-2 rounded-full  "></div>
      </div>

      <div onClick={handleNext} className={`absolute inline-block opacity-0 pointer-events-none top-[20%] right-0 z-10 cursor-pointer size-11  ${data.length - 5 !== currentIndex && "opacity-100 pointer-events-auto"} transition-all duration-200`}>
        <IoChevronForwardCircle className="size-12 top-1 right-10 z-10 fill-slate-900 hover:fill-slate-800" />
        <div className="absolute size-9 -z-10  bg-white top-1.5 right-1 rounded-full  "></div>
      </div>


    </div>

  )
}

export default Tab
