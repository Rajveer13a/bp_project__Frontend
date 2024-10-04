import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ListCourses from './Management/modes/ListCourses'
import ReviewCourse from './Management/modes/Review/Curriculum/ReviewCourse'

function ManagementRoutes() {
  return (
    <Routes>

        <Route path='/mode' element={<ListCourses/>}  />
        <Route path='/mode/review/:section' element={<ReviewCourse/>}  />

    </Routes>
  )
}

export default ManagementRoutes
