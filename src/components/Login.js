import React from 'react'
import { Form,Button,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div>
         <Card className='p-4'>
            <Card.Body>
            <h1>Log In</h1>
                <Form className='my-4'>
                    <Form.Group className='my-3'>
                        <Form.Label id='email'>email</Form.Label>
                        <Form.Control type='text' required></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-3'>
                        <Form.Label id='password'>password</Form.Label>
                        <Form.Control type='password' required></Form.Control>
                    </Form.Group>
                </Form>
                <Button type='submit'>submit</Button>
            </Card.Body>
         </Card>
         <div>
            Don't have an account?<Link to="/signup">Sign In</Link>
         </div>
    </div>
  )
}
