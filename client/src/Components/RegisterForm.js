import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import "./Forms.css";
import { Link } from 'react-router-dom';
import MessageDialog from './MessageDialog'
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useHistory} from 'react-router-dom';

export default function RegistrationForm(props) {

  const [registerInformation, setregisterInformation] = useState
    ({ firstName: '', lastName: '', password: '', reEnterPassword: '', treatmentStartDate: '', treatmentEndDate: '', email: '', phoneNum: '' });
  const { Register, error } = props;
  const [errorMsg, SetErrorMsg] = useState('');
  const [validated, setValidated] = useState(false);
  const [confirmationMsg, SetConfiramationMsg] = useState();
  let history = useHistory();



  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();


    } else {
      console.log('responses before post', registerInformation)
      axios.post(`/register/`, { ...registerInformation })
        .then((response) => {
          
          SetConfiramationMsg(response.data.message)

          history.push('/confirmation', { confirmationMsg })
        }
        )
        .catch(error => {
          if (error.response) {
            console.log(error.response);


            SetErrorMsg(error.response.data.msg)
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

          <h3 className="text-center">Please Register to receive out monthly surveys</h3>
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
  // return (
  //   <center>
  //     <Form onSubmit={submitHandler} className="login-form">
  //       <div className="form-inner">
  //         <h3 className="text-center">Register here</h3>
  //         {error !== '' ? <div className="error"> {error} </div> : ''}

  //         <Form.Group>
  //           <Form.Control
  //             className="form-control form-control-lg"
  //             type="text"
  //             name="FirstName"
  //             id="FirstName"
  //             placeholder="First Name"
  //             onChange={(e) =>
  //               setregisterInformation({ ...registerInformation, FirstName: e.target.value })
  //             }
  //             value={registerInformation.FirstName}
  //           />
  //         </Form.Group>

  //         <Form.Group>
  //           <Form.Control
  //             className="form-control form-control-lg"
  //             type="text"
  //             name="LastName"
  //             id="LastName"
  //             placeholder="Last Name"
  //             onChange={(e) =>
  //               setregisterInformation({ ...registerInformation, LastName: e.target.value })
  //             }
  //             value={registerInformation.LastName}
  //           />
  //         </Form.Group>

  //         <Form.Group>
  //           <Form.Control
  //             className="form-control form-control-lg"
  //             type="email"
  //             name="email"
  //             id="email"
  //             placeholder="Email or Phone Number"
  //             onChange={(e) =>
  //               setregisterInformation({ ...registerInformation, email: e.target.value })
  //             }
  //             value={registerInformation.email}
  //           />
  //         </Form.Group>

  //         <Form.Group>
  //           <Form.Control
  //             className="form-control form-control-lg"
  //             type="password"
  //             name="password"
  //             id="password"
  //             placeholder="Password"
  //             onChange={(e) =>
  //               setregisterInformation({ ...registerInformation, password: e.target.value })
  //             }
  //             value={registerInformation.password}
  //           />
  //         </Form.Group>

  //         <Form.Group>
  //           <Form.Control
  //             className="form-control form-control-lg"
  //             type="password"
  //             name="Renterpassword"
  //             id="Renterpassword"
  //             placeholder="Renter Password"
  //             onChange={(e) =>
  //               setregisterInformation({ ...registerInformation, renterpassword: e.target.value })
  //             }
  //             value={registerInformation.password}
  //           />
  //         </Form.Group>

  //         <Form.Group>
  //           <Form.Control
  //             className="form-control form-control-lg"
  //             type="date"
  //             name="date"
  //             id="date"
  //             placeholder="Renter Password"
  //             onChange={(e) =>
  //               setregisterInformation({ ...registerInformation, date: e.target.value })
  //             }
  //             value={registerInformation.password}
  //           />
  //         </Form.Group>

  //         <Button className="btn-lg btn-dark btn-block btn-login" type="submit">
  //           Sign up
  //         </Button>
  //         <div className="form-group col text-right">
  //         <Link to="/login" className="link-text">You are a member?</Link>                
  //         </div>
  //       </div>
  //     </Form>
  //   </center>
  // );
}
