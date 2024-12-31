import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function InstructorProtectedRoutes() {
  
    const { role, isLoggedIn } = useSelector( (state)=> state.auth);
  
    return (role === "INSTRUCTOR" && isLoggedIn) ? <Outlet/> : <Navigate to={"/"} />
}

export default InstructorProtectedRoutes
