import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase.js'
const AuthContext=React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

  const [currUser,setCurrUser]=useState()
  
  function login(email,password){
    return auth.createUserWithEmailAndPassword(email,password)
  }

  useEffect(()=>{
    const unsubcribe=auth.onAuthStateChanged((user)=>{
       setCurrUser(user)
    })

    return unsubcribe
  },[]) 

  const value={
    currUser,
    login
  }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
