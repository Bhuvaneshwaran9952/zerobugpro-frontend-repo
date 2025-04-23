import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const RefundList = () => {
    const [refunds, setRefunds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRefunds();
    }, []);

    const fetchRefunds = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/refund");
            setRefunds(response.data);
        } catch (error) {
            console.error("Error fetching refund data:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this refund record?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/refund/${id}/`);
                setRefunds(refunds.filter((r) => r.id !== id));
                alert("Refund deleted successfully.");
            } catch (error) {
                console.error("Error deleting refund:", error);
                alert("Failed to delete refund.");
            }
        }
    };

    return (
        <Container className="mt-4">
            {/* Header */}
            <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
                <h2 className="mb-0">Refund Payment List</h2>
                <Link to="/refundform" className="btn btn-warning">Add [+]</Link>
            </div>

            {/* Desktop Table View */}
            <div className="d-none d-md-block">
                <Table bordered className="mt-3">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Student Name</th>
                            <th>Pay Amount</th>
                            <th>Refund Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {refunds.length > 0 ? (
                            refunds.map((refund, index) => (
                                <tr key={refund.id}>
                                    <td>{index + 1}</td>
                                    <td>{refund.student_name}</td>
                                    <td>{refund.pay_amount}</td>
                                    <td>{refund.refund_amount}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => navigate(`/refundupdate/${refund.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(refund.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No refund records found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="d-md-none mt-3">
                {refunds.length > 0 ? (
                    refunds.map((refund, index) => (
                        <Card key={refund.id} className="mb-3 shadow-sm">
                            <Card.Body>
                                <Card.Title className="mb-2">
                                    {index + 1}. {refund.student_name}
                                </Card.Title>
                                <Card.Text>
                                    <strong>Pay Amount:</strong> {refund.pay_amount}<br />
                                    <strong>Refund Amount:</strong> {refund.refund_amount}
                                </Card.Text>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => navigate(`/refundupdate/${refund.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(refund.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No refund records found.</p>
                )}
            </div>
        </Container>
    );
};

export default RefundList;
