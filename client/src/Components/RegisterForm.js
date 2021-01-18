import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "./form.css";
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';


export default function LoginForm (props) {
  const [registerInformation, setregisterInformation] = useState
  ({ FirstName:'',LastName:'',Renterpassword:'',date:'', email: '', password: '' });
  const { Register, error } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    Register(registerInformation);
  };

  return (
    <center>
      <Form onSubmit={submitHandler} className="login-form">
        <div className="form-inner">
          <h3 className="text-center">Register here</h3>
          {error !== '' ? <div className="error"> {error} </div> : ''}

          <Form.Group>
            <Form.Control
              className="form-control form-control-lg"
              type="text"
              name="FirstName"
              id="FirstName"
              placeholder="First Name"
              onChange={(e) =>
                setregisterInformation({ ...registerInformation, FirstName: e.target.value })
              }
              value={registerInformation.FirstName}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="form-control form-control-lg"
              type="text"
              name="LastName"
              id="LastName"
              placeholder="Last Name"
              onChange={(e) =>
                setregisterInformation({ ...registerInformation, LastName: e.target.value })
              }
              value={registerInformation.LastName}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="form-control form-control-lg"
              type="email"
              name="email"
              id="email"
              placeholder="Email or Phone Number"
              onChange={(e) =>
                setregisterInformation({ ...registerInformation, email: e.target.value })
              }
              value={registerInformation.email}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="form-control form-control-lg"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setregisterInformation({ ...registerInformation, password: e.target.value })
              }
              value={registerInformation.password}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="form-control form-control-lg"
              type="password"
              name="Renterpassword"
              id="Renterpassword"
              placeholder="Renter Password"
              onChange={(e) =>
                setregisterInformation({ ...registerInformation, renterpassword: e.target.value })
              }
              value={registerInformation.password}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="form-control form-control-lg"
              type="date"
              name="date"
              id="date"
              placeholder="Renter Password"
              onChange={(e) =>
                setregisterInformation({ ...registerInformation, date: e.target.value })
              }
              value={registerInformation.password}
            />
          </Form.Group>

          <Button className="btn-lg btn-dark btn-block btn-login" type="submit">
            Sign up
          </Button>
          <div className="form-group col text-right">
          <Link to="/login" className="link-text">You are a member?</Link>                
          </div>
        </div>
      </Form>
    </center>
  );
}
