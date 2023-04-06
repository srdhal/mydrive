import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



export default function PrivateRoute({children}) {

  const {currUser}=useAuth()
  const navigate=useNavigate()


  return (
        currUser?children : navigate("/login")
        
  )
}
