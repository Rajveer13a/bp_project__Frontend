import React from 'react'
import { Route, Routes } from 'react-router-dom'

import NotFound from '@/Pages/NotFound'
import InstructorProtectedRoutes from '@/ProtectedRoutes/InstructorProtectedRoutes'

import CourseCreate from '../Instructor/Pages/CourseCreate'
import CourseManage from '../Instructor/Pages/CourseManage/CourseManage'
import Courses from '../Instructor/Pages/Courses'
import InstructorProfile from '../Instructor/Pages/InstructorProfile/InstructorProfile'
import Performance from '../Instructor/Pages/Performance'
import TeachPage from '../Instructor/Pages/TeachPage'

function InstructorRoutes() {
  return (
    <Routes>

      <Route path='/teach' element={<TeachPage />} />

      <Route element={<InstructorProtectedRoutes />} >

        <Route path='/courses' element={<Courses />} />

        <Route path='/performance' element={<Performance />} />

        <Route path='/user/edit-instructor-info/' element={<InstructorProfile />} />

        <Route path='/course/create/:num' element={<CourseCreate />} />

        <Route path='/course/:id/manage/:section' element={<CourseManage />} />

      </Route>
      
      <Route path='*' element={<NotFound/>}/>

    </Routes>
  )
}

export default InstructorRoutes
