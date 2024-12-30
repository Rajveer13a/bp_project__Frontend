import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomeLayout from './Layouts/HomeLayout'
import CourseView from "./Pages/CourseView"
import ForgotPass from './Pages/ForgotPass'
import HomePage from "./Pages/HomePage"
import Learning from "./Pages/Learning"
import LogIn from "./Pages/LogIn"
import Profile from "./Pages/Profile"
import ResetPass from './Pages/ResetPass'
import SearchCourses from './Pages/SearchCourses';
import ShoppingCart from "./Pages/ShoppingCart"
import SignUp from "./Pages/SignUp"
import VerifyEmail from "./Pages/VerifyEmail"

function UserRoutes() {
    return (

        <HomeLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/signup" element={<SignUp />} />

                <Route path="/verifyEmail" element={<VerifyEmail />} />

                <Route path="/reset-password/:token" element={<ResetPass />} />

                <Route path="/forgot-password" element={<ForgotPass />} />

                <Route path="/login" element={<LogIn />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/course/:course_id" element={<CourseView />} />

                <Route path="/my-courses/:active" element={<Learning />} />

                <Route path="/shoppingcart" element={<ShoppingCart />} />

                <Route path="/search/:searchTerm" element={<SearchCourses />} />
            </Routes>
        </HomeLayout>
    )
}

export default UserRoutes
