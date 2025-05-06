import React from "react";
import { Container, Row, Col } from "react-bootstrap";
 
const Footer = () => {
  return (
    <footer className="bg-secondary text-light py-4 mt-5">
      <Container>
        <Row>
          {/* Column 1: About */}
          <Col md={4} className="mb-3">
            <h5>About Us</h5>
            <p> Welcome to our admin dashboard! Our company is dedicated to providing innovative 
            solutions that streamline operations and enhance productivity.</p>
            <h5>Our Mission</h5>
            <p>Our mission is to empower businesses with user-friendly technology that improves efficiency, 
            fosters growth, and simplifies management. </p>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled" >
              <li><a href="/" className="text-light" style={{textDecoration: "none"}}>Home</a></li>
              <li><a href="/studentlist" className="text-light" style={{textDecoration: "none"}}>Student List</a></li>
              <li><a href="/paymentdetails" className="text-light" style={{textDecoration: "none"}}>Student Payment</a></li>
              <li><a href="/trainerpayment" className="text-light" style={{textDecoration: "none"}}>Trainer Payment</a></li>
              <li><a href="/refundlist" className="text-light" style={{textDecoration: "none"}}>Refund List</a></li>
              <li><a href="/paymentrepeated" className="text-light" style={{textDecoration: "none"}}>Pay</a></li>
              <li><a href="/interviewcards" className="text-light" style={{textDecoration: "none"}}>Interview Detials</a></li>
            </ul>
          </Col>

          {/* Column 3: Contact */}
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="mt-3 text-center">
          <Col>
            <p className="mb-0">&copy; {new Date().getFullYear()} Deck Stack Technologies. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;