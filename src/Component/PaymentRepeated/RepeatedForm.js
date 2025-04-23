import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image, Card, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";

const RepeatedForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    paymentMethod: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // You can send this to your backend here
  };

  return (
    <Container className="mt-5">
    <Card className="border shadow-lg">
      <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3 ">
          <h2 className="mb-0">Pay</h2>
          <Link to="/paymentrepeated">
              <CloseButton variant="white" />
          </Link>
      </Card.Header>
      <Form className="p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control type="tel" name="contact" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select name="paymentMethod" required onChange={handleChange}>
            <option value="">Select Your Payment Method</option>
            <option value="upi">UPI</option>
            <option value="bank">Bank Transaction</option>
            <option value="card">Credit Card</option>
          </Form.Select>
        </Form.Group>

        {/* Conditional Rendering */}
        {formData.paymentMethod === "upi" && (
          <div className="text-center my-3">
            <p>Scan the QR Code to pay via UPI:</p>
            <Image src="/images/upi-qr-code.png" alt="UPI QR" width="200" />
          </div>
        )}

        {formData.paymentMethod === "bank" && (
          <div className="border p-3 rounded mb-3">
            <h5>Bank Details</h5>
            <p><strong>Account Name:</strong> Bright Academy</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>IFSC:</strong> BRIG0000123</p>
            <p><strong>Bank Name:</strong> HDFC Bank</p>
          </div>
        )}

        {formData.paymentMethod === "card" && (
          <div className="border p-3 rounded mb-3">
            <h5>Credit Card Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" maxLength="16" placeholder="XXXX XXXX XXXX XXXX" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Expiry</Form.Label>
                  <Form.Control type="text" placeholder="MM/YY" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="password" maxLength="6" placeholder="******" />
                </Form.Group>
              </Col>
            </Row>
          </div>
        )}

        <Button type="submit" variant="primary">Submit</Button>
      </Form>
      </Card>
    </Container>
  );
};

export default RepeatedForm;
