import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './Footer.css';

export default function Footer() {


  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="links"  lg={6}>
            <a href="https://cedarhouse.org/contact-us">Contact Us </a>

            <a href="https://cedarhouselifechangecenter.godaddysites.com/donate">Make a Donation</a>

          </Col>

          <Col className="socialIcons" lg={6} >
            <Row xs={12} md={6}>

              <a href="https://www.facebook.com/CedarHouseLCC"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.twitter.com/CedarHouseLCC"><i className="fab fa-twitter"></i> </a>
              <a href="https://www.instagram.com/cedarhouselifechangecenter"><i className="fab fa-instagram"></i> </a>

            </Row>

            <Row xs={12} md={6}>
              <a href="https://www.youtube.com/channel/UCfftnknDAYhOBU8UtH6PaCw?view_as=subscriber" ><i className="fab fa-youtube"></i> </a>
              <a href="https://www.linkedin.com/company/18246049/"><i className="fab fa-linkedin-in"></i> </a>
              <a href="https://www.yelp.com/biz/cedar-house-life-change-center-bloomington" ><i className="fab fa-yelp"></i> </a>
            </Row>


          </Col>

        </Row>
        <Row className="copyRight">
          <p className="center"> &copy; {new Date().getFullYear()} Cedar House - All Rights Reserved </p>
        </Row>
      </Container>


    </footer>

  );



}