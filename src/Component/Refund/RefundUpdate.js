import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card, CloseButton } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const RefundUpdate = () => {
    const [studentName, setStudentName] = useState("");
    const [payAmount, setPayAmount] = useState("");
    const [refundAmount, setRefundAmount] = useState("");
    const [validated, setValidated] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRefund();
    }, []);

    const fetchRefund = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/refund/${id}`);
            const refund = response.data;
            setStudentName(refund.student_name);
            setPayAmount(refund.pay_amount);
            setRefundAmount(refund.refund_amount);
        } catch (error) {
            console.error("Error fetching refund:", error);
            alert("Failed to fetch refund data.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false || Number(refundAmount) > Number(payAmount)) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const updatedRefund = {
            student_name: studentName,
            pay_amount: payAmount,
            refund_amount: refundAmount,
        };

        try {
            await axios.put(`http://127.0.0.1:8000/refund/${id}`, updatedRefund);
            alert("Refund updated successfully!");
            navigate("/refundlist");
        } catch (error) {
            console.error("Error updating refund:", error);
            alert("Failed to update refund.");
        }
    };

    return (
        <Container className="mt-4">
            <Card className="p-4 shadow">
                <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white">
                    <h2 className="mb-0">Update Refund</h2>
                    <Link to="/refundlist">
                        <CloseButton variant="white" />
                    </Link>
                </Card.Header>
                <Form noValidate validated={validated} onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter student name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pay Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter paid amount"
                            value={payAmount}
                            onChange={(e) => setPayAmount(e.target.value)}
                            min="1"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a pay amount
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Refund Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter refund amount"
                            value={refundAmount}
                            onChange={(e) => setRefundAmount(e.target.value)}
                            min="0"
                            isInvalid={
                                refundAmount && Number(refundAmount) > Number(payAmount)
                            }
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a refund amount
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid">
                        <Button type="submit" variant="success">Update</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default RefundUpdate;
