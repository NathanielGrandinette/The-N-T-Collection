import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserRoutes = () => {

    const getToken = () => {
        const token = JSON.parse(localStorage.getItem('jwt'))
        return token ? token : ''
    }
    let auth = { 'token': getToken() } 

    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default UserRoutes