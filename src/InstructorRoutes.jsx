import React from 'react'
import { Route, Routes } from 'react-router-dom'

import CourseCreate from './Instructor/Pages/CourseCreate'
import CourseManage from './Instructor/Pages/CourseManage/CourseManage'
import Courses from './Instructor/Pages/Courses'


function InstructorRoutes() {
  return (
    <Routes>

        <Route path='/courses' element={<Courses/>} />
        
        <Route path='/course/create/:num' element={<CourseCreate/>} />

        <Route path='/course/:id/manage/:section' element={<CourseManage/>}/>


    </Routes>
  )
}

export default InstructorRoutes
