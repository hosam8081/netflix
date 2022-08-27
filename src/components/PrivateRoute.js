import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGlobalContext } from '../context/AuthContext'

const PrivateRoute = () => {
  const {userData} = useGlobalContext()
  return userData ? <Outlet /> : <Navigate to="/login"/>
}

export default PrivateRoute