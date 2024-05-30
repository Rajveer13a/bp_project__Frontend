import { Route, Routes } from "react-router-dom"

import CourseView from "./Pages/CourseView"
import HomePage from "./Pages/HomePage"
import Learning from "./Pages/Learning"
import LogIn from "./Pages/LogIn"
import Profile from "./Pages/Profile"
import SignUp from "./Pages/SignUp"
import VerifyEmail from "./Pages/VerifyEmail"
import LearnLectures from "./Pages/LearnLectures"






function App() {


  return (


      <Routes>

        <Route path="/" element={<HomePage/>}  />

        <Route path="/signup" element={ <SignUp/> }  />
        
        <Route path="/verifyEmail" element={ <VerifyEmail/> }  /> 

        <Route path="/login" element={ <LogIn/> }  />

        <Route path="/profile" element={ <Profile/> }  /> 

        <Route path="/course/:course_id" element={ <CourseView/> }  /> 

        <Route path="/mylearning" element={ <Learning/> }  /> 

        <Route path="/learn/lectures/:course_id" element={ <LearnLectures/> }  /> 


      </Routes>
      
      

  )
}

export default App
