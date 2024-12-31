import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function RedirectManagementToRoutes() {

    const { role, isLoggedIn } = useSelector( (state)=> state.auth);

    const isRoleAuth =  ["MODE", "ADMIN"].includes(role);
  
    return ( isRoleAuth && isLoggedIn) ? <Navigate to={"/management/mode"} /> : <Outlet/> 
}

export default RedirectManagementToRoutes
