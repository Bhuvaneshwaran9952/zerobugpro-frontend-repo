import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Modal, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {getAllRepeatedPayments, deleteRepeatedPayments} from "../../Server/RepeatedPaymentsServer"

const PaymentRepeated = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePaymentId, setDeletePaymentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10); // Number of items per page
  const navigate = useNavigate(); // For navigation on Edit

    const fetchPayments = async () => {
      try {
        const data = await getAllRepeatedPayments();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching repeated payments:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchPayments();
    }, []);

  const handleShowDeleteModal = (id) => {
    setDeletePaymentId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRepeatedPayments(deletePaymentId);
      setPayments(payments.filter(payment => payment.id !== deletePaymentId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = (id) => {
    navigate(`/paymentrepeatedupdate/${id}`);
  };

  // Pagination logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-4">
      {/* Header Section */}
      <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3 rounded">
        <h2 className="mb-0">You have a promising future</h2>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.length > 0 ? (
              currentPayments.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.contact}</td>
                  <td>{item.payment_method}</td>
                  <td className="text-center d-flex justify-content-center gap-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleShowDeleteModal(item.id)}
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

      {/* Pagination Component */}
      <Pagination className="d-flex justify-content-center mt-3">
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: Math.ceil(payments.length / paymentsPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage < Math.ceil(payments.length / paymentsPerPage) ? currentPage + 1 : currentPage)}
          disabled={currentPage === Math.ceil(payments.length / paymentsPerPage)}
        />
      </Pagination>

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
