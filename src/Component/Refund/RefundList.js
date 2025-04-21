import axios from "axios";
import React, { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const RefundList = () => {
    const [refunds, setRefunds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRefunds();
    }, [])

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
            {/* Header View */}
            <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
                <h2 className="mb-0">Refund Payment List</h2>
                <Link to="/refundform" className="btn btn-warning">Add[+]</Link>
            </div>

            {/* Table View */}
            <div className="d-none d-md-block">
                <Table bordered className="mt-3 ">
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
                                        <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/refundupdate/${refund.id}`)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(refund.id)}>Delete</Button>
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

        </Container>
    );
}

export default RefundList;
