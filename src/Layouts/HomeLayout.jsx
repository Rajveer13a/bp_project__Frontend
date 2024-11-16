import React from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar/Navbar'


function HomeLayout({children}) {
  return (
    <div className='max-w-[100vw] overflow-hidden'>
      <Navbar/>
      
      {children}

      <Footer/>
      
    </div>
  )
}

export default HomeLayout
