import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button ,Container,Row,Col} from 'react-bootstrap'

import '../App.css'
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';

export default function LandinPage (props) {
 
  return (

    <Container>
        <Row>
            <Col>
                      <div className="">
                      <h2 className="">New Client</h2>  
                      <p >Have an accout ? </p>  
                      <p >Sign in here</p>  
                      <Link to="/login"> <Button className="btn-lg btn-dark btn-block btn-login" type="submit">Log in</Button> </Link>

                    </div>
            </Col>

            <Col md={1}>
                      <div class="outer">
                      <div class="inner"></div>
                      </div>
            </Col>

            <Col>     
                    <div className="">
                    <h2 className="">Registered Client</h2>  
                      <p >New to Cedar House ?</p>  
                      <p >Create an account to get started today</p>  
                      <Link to="/register"> <Button className="btn-lg btn-dark btn-block btn-login" type="submit">Sing Up</Button> </Link>

                    </div>
            </Col>


          </Row>

    </Container>
);
 
}
