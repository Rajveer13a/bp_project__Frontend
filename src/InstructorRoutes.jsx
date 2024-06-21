import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Instructor from './Instructor/Pages/Instructor'

function InstructorRoutes() {
  return (
    <Routes>

        <Route path='/instructor' element={<Instructor/>} />

    </Routes>
  )
}

export default InstructorRoutes
