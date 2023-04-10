import React, { useRef, useState } from 'react'
import { Form,Button,Card, Alert, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth} from '../context/AuthContext'



export default function ForgotPassword() {
    const emailRef=useRef()
    
    const {passwordreset} = useAuth()
    const [err,setErr] =useState('')
    const [loading,setLoading]=useState(false)
    const [msg,setMsg]=useState("")

    const navigate=useNavigate()
    
    async function handleSubmit(e){
      e.preventDefault()
      
      try{
        setErr('')
        setLoading(true)
        await passwordreset(emailRef.current.value)
        setMsg("check your email to reset the password")
      }catch{
          setErr('failed to reset password')
      }

      setLoading(false)
   }

return (
    <div>
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "50vw"}}>
        <div className='w-100' style={{maxWidth: "600px"}}>
            <Card className='p-4'>
                <Card.Body>
                <h2>Password Reset</h2>
                {msg && <Alert variant="success">{msg}</Alert>}
                    <Form className='my-3' onSubmit={handleSubmit}>
                        <Form.Group className='my-3'>
                            <Form.Label id='email'>email</Form.Label>
                            <Form.Control type='text' ref={emailRef} required></Form.Control>
                        </Form.Group>
                      <Button type="submit" disabled={loading} className='w-100'>reset</Button>
                    </Form>
                </Card.Body>
              
            </Card>
            <div className='text-center'>
                <Link to="/login">login</Link>
            </div>
        </div>
        </Container> 
    </div>
  )
}
