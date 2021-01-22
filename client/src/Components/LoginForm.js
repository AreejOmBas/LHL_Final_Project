import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';

import "./form.css";
import "./LandingPage.css";

export default function LoginForm (props) {
  const [userDetails, setUserDetails] = useState({ email: '', password: '' })
  const { Login, error } = props
  
  const submitHandler = e => {
    e.preventDefault()
    
    props.login(userDetails)
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
                    onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                    value={userDetails.email}
              />
          </Form.Group>

          <Form.Group>
              <Form.Control
              className="form-control form-control-lg"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
              value={userDetails.password}/>
          </Form.Group>

          <Button className="btn-lg btn-dark btn-block btn-login" type="submit">Log in</Button>
          <div className="form-bottom">
              <Link to="/register" className="link-text">Not a member?</Link>                
              <Link to="/forgot-password" className="link-text">Forgot Password?</Link>                

          </div>

    </div>
    
  </Form>
  </center>
  )
}

