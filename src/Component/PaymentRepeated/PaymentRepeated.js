import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const PaymentRepeated = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal state
  const [deletePaymentId, setDeletePaymentId] = useState(null); // Store the ID of the payment to delete

  // Fetch data on mount
  useEffect(() => {
    fetchPayments();
  }, []);

  // GET request to backend API
  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/repeatedpayments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching repeated payments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show delete confirmation modal
  const handleShowDeleteModal = (id) => {
    setDeletePaymentId(id); // Set the ID to be deleted
    setShowDeleteModal(true); // Show the modal
  };

  // Handle the deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/repeatedpayments/${deletePaymentId}`);
      setPayments(payments.filter(payment => payment.id !== deletePaymentId)); // Remove the deleted payment from the state
      setShowDeleteModal(false); // Close the modal after deleting
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  // Hide the delete modal (if canceled)
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Edit payment handler (just a placeholder for now)
  const handleEdit = (id) => {
    console.log("Edit payment with ID:", id);
    // You can navigate to an edit form or show a modal for editing the payment details
  };

  return (
    <Container className="mt-4">
      {/* Header Section */}
      <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded">
        <h2 className="mb-0">You Have a Good Future</h2>
        <div className="d-flex gap-2">
          <Link to="/repeatedform" className="btn btn-info btn-sm">Pay [$]</Link>
          <Link to="/repeatedtotal" className="btn btn-light btn-sm">Total [$]</Link>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered responsive className="mt-4 no-hover-table">
          <thead className="table-dark text-center">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Payment Method</th>
              <th>Actions</th> {/* Add Actions column */}
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.contact}</td>
                  <td>{item.payment_method}</td>
                  <td className="text-center">
                    {/* <Button 
                      variant="warning" 
                      size="sm" 
                      onClick={() => handleEdit(item.id)} 
                      className="me-2"
                    >
                      Edit
                    </Button> */}
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleShowDeleteModal(item.id)} // Show modal on delete
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">No payment records found</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this payment record?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm Deletion
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentRepeated;
