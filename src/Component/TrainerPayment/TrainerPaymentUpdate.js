import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card, CloseButton } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TrainerPaymentUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState({
        trainer_name: "",
        payment_method: "",
        pay_amount: "",
        pending_payment: "",
        pay_date: "",
        due_date: "",
    });  
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      if (id) {
          fetchPayment(id);
      } else {
          console.error("No payment ID found");
      }
  }, [id]);

    const fetchPayment = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/trainerpayment/${id}/`);
            setPayment(response.data || {});
            setLoading(false);
        } catch (error) {
            console.error("Error fetching payment:", error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setPayment((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/trainerpayment/${id}/`, payment);
            alert("Payment updated successfully");
            navigate("/trainerpayment");
        } catch (error) {
            console.error("Error updating payment:", error);
            alert("Payment update failed.");
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white p-3">
                    <h2 className="mb-0">Update Trainer Payment</h2>
                    <Link to={'/trainerpayment'}>
                        <CloseButton variant="white" />
                    </Link>
                </Card.Header>
                <Form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
                    <Row>
                        <Col xs={12} className="mb-3">
                            <Form.Label>Trainer Name</Form.Label>
                            <Form.Control type="text" name="trainer_name" value={payment.trainer_name} onChange={handleChange} required />
                        </Col>

                        <Col xs={12} className="mb-3">
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Select name="payment_method" value={payment.payment_method} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Cash">Cash</option>
                                <option value="Card">Card</option>
                                <option value="Online">Online</option>
                            </Form.Select>
                        </Col>

                        <Col xs={12} md={6} className="mb-3">
                            <Form.Label>Pay Amount</Form.Label>
                            <Form.Control type="number" name="pay_amount" value={payment.pay_amount} onChange={handleChange} required />
                        </Col>

                        <Col xs={12} md={6} className="mb-3">
                            <Form.Label>Pending Payment</Form.Label>
                            <Form.Control type="number" name="pending_payment" value={payment.pending_payment} onChange={handleChange} required />
                        </Col>

                        <Col xs={12} className="mb-3">
                            <Form.Label>Pay Date</Form.Label>
                            <Form.Control type="date" name="pay_date" value={payment.pay_date} onChange={handleChange} required />
                        </Col>

                        <Col xs={12} className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" name="due_date" value={payment.due_date} onChange={handleChange} required />
                        </Col>

                        <Col xs={12} className="text-center">
                            <Button variant="success" type="submit" className="w-100 p-2">
                                Save & Change
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default TrainerPaymentUpdate;