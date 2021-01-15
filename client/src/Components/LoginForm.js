import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap'

import '../App.css'

export default function LoginForm (props) {
  const [details, setDetails] = useState({ email: '', password: '' })
  const { Login, error } = props
  
  const submitHandler = e => {
    e.preventDefault()
    Login(details)
  }

  return (
    <center>
    <Form onSubmit={submitHandler} className="login-form">

    <div className="form-inner">
        <h1 className="text-center">Login</h1>

        <h3 className="text-center">Please Log into access the Survey</h3>
        {(error !== '') ? (<div className="error"> {error} </div>) : ''}

    <Form.Group>
        <Form.Control
             className="form-control form-control-lg"
              type="email"
              name="email"
              id="email"
              placeholder="Email or Phone Number"
              onChange={e => setDetails({ ...details, email: e.target.value })}
              value={details.email}
        />
    </Form.Group>

    <Form.Group>
        <Form.Control
        className="form-control form-control-lg"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={e => setDetails({ ...details, password: e.target.value })}
        value={details.password}/>
    </Form.Group>

    <Button className="btn-lg btn-dark btn-block" type="submit">Log in</Button>
    <div className="form-group col text-right">
    <a href="forgot-password" className="">Forgot Password?</a>
    </div>

    </div>
    
  </Form>
  </center>
  )
}
