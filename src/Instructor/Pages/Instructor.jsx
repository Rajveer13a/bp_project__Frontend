import React from 'react'

import Navbar from '../components/Navbar'

function Instructor() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl">Main Content</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  )
}

export default Instructor
