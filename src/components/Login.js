import React, { useRef, useState } from 'react'
import { Form,Button,Card, Alert, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth} from '../context/AuthContext'



export default function Signup() {
    const emailRef=useRef()
    const passwordRef=useRef()
    
    const {login,currUser} = useAuth()
    const [err,setErr] =useState('')
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    
    async function handleSubmit(e){
      e.preventDefault()
      
      try{
        setErr('')
        setLoading(true)
        await login(emailRef.current.value,passwordRef.current.value)
        navigate("/dashboard")
      }catch{
          setErr('failed login')
      }

      setLoading(false)
   }

return (
    <div>
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "50vw"}}>
        <div className='w-100' style={{maxWidth: "600px"}}>
              <Card className='p-4'>
                    <Card.Body>
                    <h2>Log In</h2>
                    {currUser && currUser.email}
                    {err && <Alert variant="danger">{err}</Alert>}
                          <Form className='my-3' onSubmit={handleSubmit}>
                              <Form.Group className='my-3'>
                              <Form.Label id='email'>email</Form.Label>
                              <Form.Control type='text' ref={emailRef} required></Form.Control>
                              </Form.Group>
                              <Form.Group className='my-3'>
                              <Form.Label id='password'>password</Form.Label>
                              <Form.Control type='password' ref={passwordRef} required></Form.Control>
                              </Form.Group>
                              <Button type="submit" disabled={loading} className='w-100'>submit</Button>
                          </Form>
                    </Card.Body>
                    <div className='text-center'>
                    <Link to="/forgotpassword">Forgot Password</Link>
                    </div>
              </Card>
              <div>
              Don't have an account ?<Link to="/signup">Sign Up</Link>
              </div>
        </div>
        </Container>
    </div>
  )
}
