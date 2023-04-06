import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


export default function Dashboard() {

  const {currUser,logout}=useAuth()
  const [loading,setLoading]=useState()
  const navigate=useNavigate()
  const [err,setErr]=useState()


  async function handleLogout(){
     
     try{
       await logout()
       navigate("/")
     }catch{
        setErr("logout error")
     }

  }

  return (
    <div >
      <Card className='p-4'>
        <Card.Body>
           <h2 className='text-center mb-4'>Profile</h2>
           <strong>Email:   </strong>{currUser.email}
        </Card.Body>
        <Link className='btn btn-primary w-80 mt-3'>update</Link>
      </Card>
      <div className='text-center my-4'>
        <Button variant='link' onClick={handleLogout}>Log Out</Button>
      </div>
    </div>
  )
}
