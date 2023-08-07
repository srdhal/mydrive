import React, { useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



export default function PrivateRoute({children}) {
  
  const navigate=useNavigate()
  const {currUser}=useAuth()
  console.log(currUser)
  React.useEffect(() => {
    if(!currUser) navigate('/login')
  }, [currUser])

  return (
        currUser && children 
        
  )
}
