import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import SignUp from "./Pages/SignUp"
import VerifyEmail from "./Pages/VerifyEmail"
import LogIn from "./Pages/LogIn"






function App() {


  return (


      <Routes>

        <Route path="/" element={<HomePage/>}  />

        <Route path="/signup" element={ <SignUp/> }  />
        
        <Route path="/verifyEmail" element={ <VerifyEmail/> }  /> 

        <Route path="/login" element={ <LogIn/> }  /> 


      </Routes>
      
      

  )
}

export default App
