import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Sales from './Management/admin/Sales'
import ListCourses from './Management/modes/ListCourses'
import ReviewCourse from './Management/modes/ReviewCourse'

function ManagementRoutes() {
  return (
    <Routes>

        <Route path='/mode' element={<ListCourses/>}  />
        <Route path='/admin' element={<Sales/>}  />
        <Route path='/mode/review/:section' element={<ReviewCourse/>}  />

    </Routes>
  )
}

export default ManagementRoutes
