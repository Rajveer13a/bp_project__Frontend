import Cookies from 'js-cookie';
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

import eventEmitter from "./Helpers/eventEmitter"
import LearnLecture from './Pages/LearnLecture';
import AuthProtectedRoutes from './ProtectedRoutes/AuthProtectedRoutes';
import { resetData } from "./Redux/Slices/AuthSlice"
import { getConfig } from "./Redux/Slices/UserConfigSlice"
import { store } from "./Redux/store"
import InstructorRoutes from "./Routes/InstructorRoutes"
import ManagementRoutes from "./Routes/ManagementRoutes"
import UserRoutes from './Routes/UserRoutes';
import RedirectManagementToRoutes from './ProtectedRoutes/RedirectManagementToRoutes';
import NotFound from './Pages/NotFound';





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


      <Route element={<RedirectManagementToRoutes />}>

        <Route element={<AuthProtectedRoutes />}>

          <Route path="/learn/lecture/:course_id" element={<LearnLecture />} />

        </Route>

        <Route path="/instructor/*" element={<InstructorRoutes />} />

      </Route>



      <Route path="/management/*" element={<ManagementRoutes />} />

      <Route path="/*" element={<UserRoutes />} />

    </Routes>



  )
}

export default App
