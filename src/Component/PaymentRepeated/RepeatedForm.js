import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image, Card, CloseButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {createRepeatedPayments} from "../../Server/RepeatedPaymentsServer"

const RepeatedForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    payment_method: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPayment = { ...formData };

    try {
      const response = await createRepeatedPayments(newPayment);
      alert("Payment added successfully!");
      navigate("/paymentrepeated");
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="border shadow-lg">
        <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3">
          <h2 className="mb-0">Pay</h2>
          <Link to="/paymentrepeated">
            <CloseButton variant="white" />
          </Link>
        </Card.Header>
        <Form className="p-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
            >
              <option value="">Select Your Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transaction">Bank Transaction</option>
              <option value="Credit Card">Credit Card</option>
            </Form.Select>
          </Form.Group>

          {formData.payment_method === "UPI" && (
            <div className="text-center my-3">
              <p>Scan the QR Code to pay via UPI:</p>
              <Image src="/images/upi-qr-code.png" alt="UPI QR" width="200" />
            </div>
          )}

          {formData.payment_method === "Bank Transaction" && (
            <div className="border p-3 rounded mb-3">
              <h5>Bank Details</h5>
              <p><strong>Account Name:</strong> Bright Academy</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>IFSC:</strong> BRIG0000123</p>
              <p><strong>Bank Name:</strong> HDFC Bank</p>
            </div>
          )}

          {formData.payment_method === "Credit Card" && (
            <div className="border p-3 rounded mb-3">
              <h5>Credit Card Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="cardNumber"
                      maxLength="16"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-2">
                    <Form.Label>Expiry</Form.Label>
                    <Form.Control
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-2">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="password"
                      name="cvv"
                      maxLength="3"
                      placeholder="***"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
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
