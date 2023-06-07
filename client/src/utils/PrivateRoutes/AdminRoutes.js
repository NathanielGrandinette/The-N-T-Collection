import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";

const AdminRoutes = () => {
    const { user } = useContext(AuthContext)

    return (
        user?.role === 'admin' ? <Outlet /> : <Navigate to='/login' />
    )
}

export default AdminRoutes