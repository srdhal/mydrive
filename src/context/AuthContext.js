import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase.js'
const AuthContext=React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

  const [currUser,setCurrUser]=useState()
  const [loading,setLoading]=useState(false)


  function signin(email,password){
    return auth.createUserWithEmailAndPassword(email,password)
  }

  function login(email,password){
    return auth.signInWithEmailAndPassword(email,password)
  }

  function logout(){
    return auth.signOut()
  }

  function passwordreset(email){
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(()=>{
    const unsubcribe=auth.onAuthStateChanged((user)=>{
       setCurrUser(user)
       setLoading(true)
    })

    return unsubcribe
  },[]) 

  const value={
    currUser,
    signin,
    login,
    logout,
    passwordreset
  }

  return (
    <AuthContext.Provider value={value}>
        {loading && children}
    </AuthContext.Provider>
  )
}
