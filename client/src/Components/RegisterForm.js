import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "../App.css";

export default function LoginForm (props) {
  const [details, setDetails] = useState({ email: '', password: '' });
  const { Register, error } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    Register(details);
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
                setDetails({ ...details, FirstName: e.target.value })
              }
              value={details.FirstName}
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
                setDetails({ ...details, LastName: e.target.value })
              }
              value={details.LastName}
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
                setDetails({ ...details, email: e.target.value })
              }
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
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </Form.Group>

          <Button className="btn-lg btn-dark btn-block" type="submit">
            Sign up
          </Button>
        </div>
      </Form>
    </center>
  );
}
