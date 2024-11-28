import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"

import eventEmitter from "./Helpers/eventEmitter"
import InstructorRoutes from "./InstructorRoutes"
import ManagementRoutes from "./ManagementRoutes"
import CourseView from "./Pages/CourseView"
import HomePage from "./Pages/HomePage"
// import HomePage from "./Pages/HomePage"
// import Learning from "./Pages/Learning"
// import LearnLectures from "./Pages/LearnLectures"
import LogIn from "./Pages/LogIn"
// import Profile from "./Pages/Profile"
import ShoppingCart from "./Pages/ShoppingCart"
import SignUp from "./Pages/SignUp"
// import VerifyEmail from "./Pages/VerifyEmail"
import { resetData } from "./Redux/Slices/AuthSlice"
import { store } from "./Redux/store"
import { getConfig } from "./Redux/Slices/UserConfigSlice"







function App() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  window.scrollTo(0, 0);

  eventEmitter.on('resetAuthState', () => {

    store.dispatch(resetData());
    navigate('/login')

  });

  useEffect(() => {
    dispatch(getConfig())
  }, [])

  return (


    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/signup" element={<SignUp />} />

      {/* <Route path="/verifyEmail" element={<VerifyEmail />} /> */}

      <Route path="/login" element={<LogIn />} />

      {/* <Route path="/profile" element={<Profile />} /> */}

      <Route path="/course/:course_id" element={<CourseView />} />

      {/* <Route path="/mylearning" element={<Learning />} /> */}

      {/* <Route path="/learn/lectures/:course_id" element={<LearnLectures />} /> */}

      <Route path="/shoppingcart" element={<ShoppingCart />} />

      <Route path="/instructor/*" element={<InstructorRoutes />} />

      <Route path="/management/*" element={<ManagementRoutes />} />

    </Routes>



  )
}

export default App
