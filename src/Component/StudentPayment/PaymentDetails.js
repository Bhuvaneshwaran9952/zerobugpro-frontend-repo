import React, { useEffect, useState } from "react";
import { Table, Container, Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/payment");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/payment/${id}/`);
        setPayments(payments.filter(payment => payment.id !== id));
        alert("Payment deleted successfully!");
      } catch (error) {
        console.error("Error deleting payment:", error);
        alert("Failed to delete payment.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
        <h2 className="mb-0">Student Payment List</h2>
        <Link to="/paymentform" className="btn btn-warning">Add [+]</Link>
      </div>

      {/* Table View for Larger Screens */}
      <div className="d-none d-md-block">
        <Table bordered className="mt-3">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Student Name</th>
              <th>Payment Method</th>
              <th>Pay Amount</th>
              <th>Pending Payment</th>
              <th>Pay Date</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              const dueDate = new Date(payment.due_date);
              const payDate = new Date(payment.pay_date); 
              
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              dueDate.setHours(0, 0, 0, 0);

              const isOverdue = dueDate < today && payment.pending_payment > 0;
              const isFullyPaid = payment.pending_payment === 0;

              return (
                <tr key={payment.id} className={isOverdue ? "bg-danger text-white" : isFullyPaid ? "bg-success text-white" : ""}>
                  <td>{index + 1}</td>
                  <td>
                    <span className={isOverdue ? "badge bg-danger me-2" : isFullyPaid ? "badge bg-success me-2" : "badge bg-warning me-2"}>
                      <GoDotFill />
                    </span>
                    {payment.student_name}
                  </td>
                  <td>{payment.payment_method}</td>
                  <td>{payment.pay_amount}</td>
                  <td>{payment.pending_payment}</td>
                  <td>{payDate.toLocaleDateString()}</td>
                  <td>{dueDate.toLocaleDateString()}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => navigate(`/paymentupdate/${payment.id}`)} className="me-2">Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(payment.id)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* Card View for Mobile Screens */}
      <div className="d-block d-md-none">
        {payments.map((payment, index) => {
          const dueDate = new Date(payment.due_date);
          const payDate = new Date(payment.pay_date); 
          
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          dueDate.setHours(0, 0, 0, 0);

          const isOverdue = dueDate < today && payment.pending_payment > 0;
          const isFullyPaid = payment.pending_payment === 0;

          return (
            <Card key={payment.id} className={`mb-3 ${isOverdue ? "border-danger" : isFullyPaid ? "border-success" : "border-warning"}`}>
              <Card.Body>
                <h5>
                  <GoDotFill className={isOverdue ? "text-danger" : isFullyPaid ? "text-success" : "text-warning"} />{" "}
                  {payment.student_name}
                </h5>
                <p><strong>Method:</strong> {payment.payment_method}</p>
                <p><strong>Paid:</strong> ${payment.pay_amount}</p>
                <p><strong>Pending:</strong> ${payment.pending_payment}</p>
                <p><strong>Pay Date:</strong> {payDate.toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> {dueDate.toLocaleDateString()}</p>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" size="sm" onClick={() => navigate(`/paymentupdate/${payment.id}`)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(payment.id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default PaymentDetails;
