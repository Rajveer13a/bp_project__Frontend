import Cookies from 'js-cookie';
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

import eventEmitter from "./Helpers/eventEmitter"
import InstructorRoutes from "./InstructorRoutes"
import ManagementRoutes from "./ManagementRoutes"
import { resetData } from "./Redux/Slices/AuthSlice"
import { getConfig } from "./Redux/Slices/UserConfigSlice"
import { store } from "./Redux/store"
import UserRoutes from './UserRoutes';
import LearnLecture from './Pages/LearnLecture';





function App() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  window.scrollTo(0, 0);

  eventEmitter.on('resetAuthState', () => {

    store.dispatch(resetData());
    navigate('/login')

  });


  useEffect(() => {
    dispatch(getConfig());
  }, [])

  return (


    <Routes>


      <Route path="/learn/lecture/:course_id" element={<LearnLecture />} />

      <Route path="/instructor/*" element={<InstructorRoutes />} />

      <Route path="/management/*" element={<ManagementRoutes />} />

      <Route path="/*" element={<UserRoutes />} />

    </Routes>



  )
}

export default App
