import React from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/navbar/Navbar'

function HomeLayout({children}) {
  return (
    <div>
      <Navbar/>
      
      {children}

      <Footer/>
      
    </div>
  )
}

export default HomeLayout
