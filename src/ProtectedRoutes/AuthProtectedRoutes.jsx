import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AuthProtectedRoutes() {

    const { role, isLoggedIn } = useSelector((state) => state.auth);

    return (isLoggedIn) ? <Outlet /> : <Navigate to={"/login"} />
}

export default AuthProtectedRoutes
