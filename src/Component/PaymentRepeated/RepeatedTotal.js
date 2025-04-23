import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Table, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";

const RepeatedTotal = () => {
  const [payments, setPayments] = useState([
    { amount: "", date: "", method: "" }
  ]);

  const addPayment = () => {
    setPayments([...payments, { amount: "", date: "", method: "" }]);
  };

  const removePayment = (index) => {
    const newPayments = [...payments];
    newPayments.splice(index, 1);
    setPayments(newPayments);
  };

  const handleChange = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

  const total = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", payments);
  };

  return (
    <Container className="mt-5">
        <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
        {/* Left: Heading */}
        <h3 className="mb-0">Total Payment</h3>

        {/* Right: Buttons and Total */}
        <div className="d-flex align-items-center gap-3">
            <Button variant="success" onClick={addPayment}>
            Add Payment [+]
            </Button>
            <h5 className="mb-0">Total: ₹{total}</h5>
            <Link to="/paymentrepeated">
            <CloseButton variant="white" />
            </Link>
        </div>
        </div>

      <Form onSubmit={handleSubmit}>
        <Table bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={payment.amount}
                    onChange={(e) => handleChange(index, "amount", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="date"
                    value={payment.date}
                    onChange={(e) => handleChange(index, "date", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <Form.Select
                    value={payment.method}
                    onChange={(e) => handleChange(index, "method", e.target.value)}
                  >
                    <option value="">Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="bank">Bank Transaction</option>
                    <option value="card">Credit Card</option>
                  </Form.Select>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removePayment(index)}
                    disabled={payments.length === 1}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="primary" type="submit">
          Submit Payments
        </Button>
      </Form>
    </Container>
  );
};

export default RepeatedTotal;
