import React, { useEffect, useState } from "react";
import { Table, Button, Container, Card, Row, Col, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {getAllTrainer, deleteTrainer} from "../../Server/TrainerServer";

const TrainerUserList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllTrainer();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => navigate(`/trainerupdate/${id}`);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this trainer?");
    if (!confirmed) return;

    try {
      await deleteTrainer(id); // Sends DELETE request to backend
      setData(prevData => prevData.filter(item => item.id !== id)); // Update UI
      setCurrentPage(1); // Optional: Reset pagination
    } catch (error) {
      console.error("Error deleting trainer:", error);
      alert("Failed to delete trainer. Please try again.");
    }
  };


  const handleAssign = (id) => navigate(`/trainerassign/${id}`);
  const handleView = (id) => navigate(`/viewpage/${id}`);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="justify-content-center mt-3">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === currentPage}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    );
  };

  return (
    <Container>
      <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
        <h2 className="mb-0">Trainer List</h2>
        <Link to="/trainer/traineruserlist" className="btn btn-warning">Add Trainer  [+]</Link>
      </div>

      {/* Desktop Table View */}
      <div className="d-none d-md-block">
        <Table bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Subject</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.subject}</td>
                <td>{item.address}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(item.id)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>{' '}
                  <Button variant="primary" size="sm" onClick={() => handleAssign(item.id)}>Assign</Button>{' '}
                  <Button variant="info" size="sm" onClick={() => handleView(item.id)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {renderPagination()}
      </div>

      {/* Mobile Card View */}
      <div className="d-md-none">
        <Row>
          {currentItems.map((item, index) => (
            <Col xs={12} key={item.id} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold">{item.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {item.email} <br />
                    <strong>Contact:</strong> {item.contact} <br />
                    <strong>Subject:</strong> {item.subject} <br />
                    <strong>Address:</strong> {item.address}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="warning" size="sm" onClick={() => handleEdit(item.id)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <Button variant="primary" size="sm" onClick={() => handleAssign(item.id)}>Assign</Button>
                    <Button variant="info" size="sm" onClick={() => handleView(item.id)}>View</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {renderPagination()}
      </div>
    </Container>
  );
};

export default TrainerUserList;
