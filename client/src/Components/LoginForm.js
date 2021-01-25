import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Router, Route, Link, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import MessageDialog from './MessageDialog';
import "./Forms.css";
import "./LandingPage.css";

export default function LoginForm(props) {
  
  const [userDetails, setUserDetails] = useState({ email: '', password: '' })
  const [errorMsg, SetErrorMsg] = useState('');
  const [validated, setValidated] = useState(false);
  let history = useHistory();
  let location = useLocation();


  const { Login, error } = props;
  let { from } = location.state || { from: { pathname: "/" } };

  const submitHandler = event => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {

      event.preventDefault();
      event.stopPropagation();


    } else {
      event.preventDefault()

      props.login(userDetails)
        .then((response) => {

          if (response.status === 200) {
            console.log(response.data);
            const { accessToken } = response.data;
            props.setUser(accessToken);
            localStorage.setItem('token', accessToken);

            history.replace(from);
          } else {
            history.push('/');


          }
        })
        .catch(error => {
          if (error.response) {
            // console.log(error.response);


            SetErrorMsg(error.response.data.message)
          } else if (error.request) {
            console.log(error.request);


          } else if (error.message) {
            console.log(error.message);
            //do something other than the other two

          }
          console.error(error);
          //alert('Error logging in please try again');
        });

    }
    setValidated(true)

  }

  return (
    <center>


      <Form noValidate validated={validated} onSubmit={submitHandler} className="login-form">
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
            <Form.Control.Feedback>
              Please choose an answer.
            </Form.Control.Feedback>
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
            <Form.Control.Feedback>
              Please choose an answer.
            </Form.Control.Feedback>
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

