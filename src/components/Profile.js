import React, { useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


export default function Profile() {

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
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "50vw"}}>
        <div className='w-100' style={{maxWidth: "600px"}}>
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
        </Container>  
    </div>
  )
}
