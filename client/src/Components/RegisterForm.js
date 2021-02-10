import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

import MessageDialog from './MessageDialog'
import DatePicker from 'react-datepicker';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';

import "./Forms.css";

/* Component for the registartion page */

export default function RegistrationForm(props) {

  const [registerInformation, setregisterInformation] = useState
    ({ firstName: '', lastName: '', password: '', reEnterPassword: '', treatmentStartDate: '', treatmentEndDate: '', email: '', phoneNum: '' });
  const [errorMsg, SetErrorMsg] = useState('');
  const [validated, setValidated] = useState(false);

  let history = useHistory();

  //Handel Form submition
  const handleSubmit = (event) => {

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();


    } else {

      axios.post(`/register/`, { ...registerInformation })
        .then((response) => {
          const confirmationMsg = response.data.message;
          history.push({
            pathname: '/confirmation',
            state: { register: confirmationMsg }
          })
        }
        )
        .catch(error => {
          if (error.response) {
            SetErrorMsg(error.response.data.message)
          }
        })
    }
    setValidated(true);
    event.preventDefault();

  };

  return (
    <center>

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
        <div className="form-header">
          <h1 className="text-center">Registration Form</h1>

          <h3 className="text-center">Please Register to receive our monthly surveys</h3>
          {errorMsg && <MessageDialog msg={errorMsg} />}

          <Form.Group className="form-input-container">
            <Form.Control
              className="form-input form-control-lg"
              type="text"
              name="FirstName"
              id="FirstName"
              placeholder="First Name"
              onChange={(e) =>
                setregisterInformation({ ...registerInformation, firstName: e.target.value })
              }
              value={registerInformation.firstName}
              required
            />
          </Form.Group>
          <Form.Group className="form-input-container">
            <Form.Control
              className="form-input form-control-lg"
              type="text"
              name="LastName"
              id="LastName"
              placeholder="Last Name"
              onChange={(e) =>
                setregisterInformation({ ...registerInformation, lastName: e.target.value })
              }
              value={registerInformation.lastName}
              required
            />
          </Form.Group>

          <Form.Group className="form-input-container">
            <Form.Control
              className="form-input form-control-lg"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={e => setregisterInformation({ ...registerInformation, email: e.target.value })}
              value={registerInformation.email}
              required
            />
          </Form.Group>
          <Form.Group className="form-input-container">
            <Form.Control
              className="form-input form-control-lg"
              type="phone"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              onChange={e => setregisterInformation({ ...registerInformation, phoneNum: e.target.value })}
              value={registerInformation.phoneNum}
            />
          </Form.Group>

          <Form.Group className="form-input-container">
            <Form.Control
              className="form-input form-control-lg "
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={e => setregisterInformation({ ...registerInformation, password: e.target.value })}
              value={registerInformation.password}
              required />
          </Form.Group>
          <Form.Group className="form-input-container">
            <DatePicker
              className="form-input form-input-date form-control-lg"
              placeholderText="Treatment Start Date"
              dateFormat="yyyy/MM/dd"
              selected={registerInformation.treatmentStartDate} onChange={(date) =>
                setregisterInformation({ ...registerInformation, treatmentStartDate: date })
              }
              value={registerInformation.treatmentStartDate}
              required
            />
          </Form.Group>
          <Form.Group className="form-input-container">
            <DatePicker
              className="form-input form-input-date form-control-lg"
              placeholderText="Treatment End Date"
              dateFormat="yyyy/MM/dd"
              selected={registerInformation.treatmentEndDate} onChange={(date) =>
                setregisterInformation({ ...registerInformation, treatmentEndDate: date })}
              required
            />

          </Form.Group>

          <Button className="btn-lg btn-dark btn-block btn-login" type="submit">Register</Button>
          <div className="form-bottom">
            <Link to="/register" className="link-text">Not a member?</Link>
            <Link to="/forgot-password" className="link-text">Forgot Password?</Link>

          </div>

        </div>

      </Form>
    </center>
  )
}
