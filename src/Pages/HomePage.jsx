import React from 'react'

import { Carousel } from '@/components/Carousel'
import HomeLayout from '@/Layouts/HomeLayout'

function HomePage() {
  return (

    <HomeLayout>

      <Carousel />

      <div className='mb-6 lg:m-0 h-[140px] py-10 pl-8  bg-slate-500 '>
        <h1 className='font-bold text-3xl font-serif'>All the skills you need in one place</h1>
        From critical skills to technical topics, Udemy supports your professional development.
      </div>

      {/* <Tab/> */}



    </HomeLayout>

  )
}

export default HomePage
