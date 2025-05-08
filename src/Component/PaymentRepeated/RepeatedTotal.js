import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RepeatedTotal = () => {
  const [payments, setPayments] = useState([
    { id: "", amount: "", date: "", method: "" }
  ]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/paymenttotal");
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
        toast.error("Failed to load payments.");
      }
    };

    fetchPayments();
  }, []);

  const addPayment = () => {
    setPayments([...payments, { id: "", amount: "", date: "", method: "" }]);
  };

  const removePayment = async (index) => {
    const Confirmed = window.confirm("Are you sure you want to delete this payment?")
    if (!Confirmed) return;

    const paymentToDelete = payments[index];

    if (!paymentToDelete.id) {
      // Unsaved row; just remove from UI
      const newPayments = payments.filter((_, i) => i !== index);
      setPayments(newPayments);
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/paymenttotal/${paymentToDelete.id}`);
      setPayments(payments.filter((_, i) => i !== index));
      toast.success("Payment deleted successfully.");
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Failed to delete payment.");
    }
  };

  const handleChange = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

  const total = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validPayments = payments.every(
      (p) => p.amount && p.date && p.method
    );

    if (!validPayments) {
      toast.warning("Please fill all required fields before submitting.");
      return;
    }

    try {
      for (const payment of payments) {
        if (payment.id) {
          await axios.put(`http://127.0.0.1:8000/paymenttotal/${payment.id}`, payment);
        } else {
          await axios.post("http://127.0.0.1:8000/paymenttotal/", payment);
        }
      }
      toast.success("Payments submitted successfully.");
    } catch (error) {
      console.error("Error saving payments:", error);
      toast.error("Failed to submit payments.");
    }
  };

  return (
    <Container className="mt-5">
      <ToastContainer position="top-center" />
      <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
        <h3 className="mb-0">Total Payment</h3>
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
                    required
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
