import React, { useRef, useState } from 'react'
import { Form,Button,Card, Alert, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth} from '../context/AuthContext'



export default function Signup() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const navigate=useNavigate()
    const {signin,currUser} = useAuth()
    const [err,setErr] =useState('')
    const [loading,setLoading]=useState(false)
    
    
    async function handleSubmit(e){
      e.preventDefault()
      
      if(passwordConfirmRef.current.value!==passwordRef.current.value){
          return setErr('passwords do not match')
        }
 
      try{
        setErr('')
        setLoading(true)
        await signin(emailRef.current.value,passwordRef.current.value)
        navigate("/login")
      }catch{
          setErr('failed to create an account')
      }

      setLoading(false)
   }

return (
    <div>
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "50vw"}}>
        <div className='w-100' style={{maxWidth: "600px"}}>
              <Card className='p-4'>
                  <Card.Body>
                  <h2>Sign In</h2>
                  {/* {currUser.email} */}
                  {err && <Alert variant="danger">{err}</Alert>}
                      <Form className='my-4' onSubmit={handleSubmit}>
                          <Form.Group className='my-3'>
                              <Form.Label id='email'>email</Form.Label>
                              <Form.Control type='text' ref={emailRef} required></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-3'>
                              <Form.Label id='password'>password</Form.Label>
                              <Form.Control type='password' ref={passwordRef} required></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-3'>
                              <Form.Label id='password-confirm'>confirm password</Form.Label>
                              <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
                          </Form.Group>
                        <Button type="submit" disabled={loading}>submit</Button>
                      </Form>
                  </Card.Body>
              </Card>
              <div>
                  Already have an account ?<Link to="/login">Login</Link>
              </div>
          </div>
          </Container>    
    </div>
  )
}
