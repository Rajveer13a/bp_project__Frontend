import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Courses from './Instructor/Pages/Courses'


function InstructorRoutes() {
  return (
    <Routes>

        <Route path='/courses' element={<Courses/>} />

    </Routes>
  )
}

export default InstructorRoutes
