import React, {useEffect, useState} from 'react'
import { Link, useLocation, useSearchParams, useNavigate, redirect } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../Components/FormContainer'

function LoginScreen() {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const { error, loading, userInfo} = userLogin

  let navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo){
        navigate(redirect)
    }
  }, [navigate, dispatch, redirect, userInfo])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='Password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' style={{marginTop: '10px'}}>
                Sign In
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Not yet registered? <Link 
                to={redirect ? `/register?redirect=${redirect}`:`/register`}>
                    Register
                </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen