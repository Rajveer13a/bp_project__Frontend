import React from 'react'
import { Route, Routes } from 'react-router-dom'

import CourseCreate from './Instructor/Pages/CourseCreate'
import Courses from './Instructor/Pages/Courses'


function InstructorRoutes() {
  return (
    <Routes>

        <Route path='/courses' element={<Courses/>} />
        
        <Route path='/course/create/:num' element={<CourseCreate/>} />


    </Routes>
  )
}

export default InstructorRoutes
