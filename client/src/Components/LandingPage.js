import React from 'react';

import { Button, Container, Row, Col } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Link, Switch,Redirect } from 'react-router-dom';
import "./LandingPage.css";


/* Component for the main page of the app */

export default function LandinPage() {

  return (

    <Container className="landing-page">

      <Row className="landing-row">
        <Col className="landing-col first-col">
          <h2 className="">Registered Client</h2>
          <p >Have an accout ? </p>
          <p >Sign in here</p>
          <Link to="/login"> <Button className="btn-lg btn-dark btn-block btn-login" type="submit">Log in</Button> </Link>
        </Col>

        <Col md={1}>
          <div className="outer">
            <div className="inner"></div>
          </div>
        </Col>

        <Col className="landing-col">
          <h2 className="">New Client</h2>
          <p >New to Cedar House ?</p>
          <p >Create an account to get started today</p>
          <Link to="/register"> <Button className="btn-lg btn-dark btn-block btn-login" type="submit">Sing Up</Button> </Link>


        </Col>
      </Row>

    </Container>
  );

}
