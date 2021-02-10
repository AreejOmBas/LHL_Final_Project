import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {  BrowserRouter as Router, Route, Link, Switch,Redirect, useHistory, useLocation } from 'react-router-dom';
import MessageDialog from './MessageDialog';



import "./Forms.css";

/* Component for the Login page */

export default function LoginForm(props) {

  const [userDetails, setUserDetails] = useState({ email: '', password: '' }); //State to store user's input
  const [errorMsg, SetErrorMsg] = useState(''); // To store error messages
  const [validated, setValidated] = useState(false); //check for form validation

  let history = useHistory(); // to save the history of the path 
  let location = useLocation(); // to get location of url



  let { from } = location.state || { from: { pathname: "/" } }; // used to redirect if coming from email link and not logged in 

  // Login Form submission
  const handelSubmit = event => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

    } else {
      event.preventDefault();
      props.login(userDetails)
        .then((response) => {

          if (response.status === 200) {

            const { accessToken } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('email',response.data.email)
            props.token(accessToken);
            props.setUser(response.data.email);
           
            history.replace(from);

          } else {
            history.push('/');
          }
        })
        .catch(error => {
          if (error.response) {
            SetErrorMsg(error.response.data.message);
          }
        });

    }
    setValidated(true)

  }

  return (
    <center>

      <Form noValidate validated={validated} onSubmit={handelSubmit} className="login-form">
        <div className="form-header">
          <h1 className="text-center">Login</h1>

          <h3 className="text-center">Please Log in to access the Survey</h3>
          {errorMsg && <MessageDialog msg={errorMsg} />}

          <Form.Group className="form-input-container">
            <Form.Control
              className="form-input form-control-lg"
              type="email"
              name="email"
              id="email"
              placeholder="Email or Phone Number"
              onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
              value={userDetails.email}
              required
            />

          </Form.Group>

          <Form.Group className="form-input-container">
            <Form.Control
              className="form-input form-control-lg "
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
              value={userDetails.password}
              required />

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

