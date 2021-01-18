import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './Footer.css';

export default function Footer() {


  return (
    <footer className="footer">
      <Container fluid>
        <Row className="footer-content-row">
          <Col className="links" >
            <a href="https://cedarhouse.org/contact-us">Contact Us </a>

            <a href="https://cedarhouselifechangecenter.godaddysites.com/donate">Make a Donation</a>

          </Col>
         
 
          <Col className="social-col" >
            <Row xs={12} md={6} className="social-icons" >

              <a className="icons-link" href="https://www.facebook.com/CedarHouseLCC"><i class="fab fa-facebook-f"></i></a>
              <a className="icons-link" href="https://www.twitter.com/CedarHouseLCC"><i className="fab fa-twitter"></i> </a>
              <a  className="icons-link" href="https://www.instagram.com/cedarhouselifechangecenter"><i className="fab fa-instagram"></i> </a>
              <a className="icons-link" href="https://www.youtube.com/channel/UCfftnknDAYhOBU8UtH6PaCw?view_as=subscriber" ><i className="fab fa-youtube"></i> </a>
              <a className="icons-link" href="https://www.linkedin.com/company/18246049/"><i className="fab fa-linkedin-in"></i> </a>
              <a className="icons-link" href="https://www.yelp.com/biz/cedar-house-life-change-center-bloomington" ><i className="fab fa-yelp"></i> </a>
            

            </Row>

            {/* <Row xs={12} md={6} className="socialIcons" >
            </Row> */}


          </Col>

        </Row>
        <Row className="copyRight">
          <p className="center"> &copy; {new Date().getFullYear()} Cedar House - All Rights Reserved </p>
        </Row>
      </Container>


    </footer>

  );



}