import React, { useEffect, useState } from "react";
import { Table, Button, Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TrainerUserList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/trainer");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => navigate(`/trainerupdate/${id}`);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/trainer/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const handleAssign = (id) => navigate(`/trainerassign/${id}`);
  const handleView = (id) => navigate(`/viewpage/${id}`);

  return (
    <Container>
      <div className="card-header mb-3">
        <Link to="/trainer/traineruserlist" className="btn btn-warning">Add Trainer [+]</Link>
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
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
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
      </div>

      {/* Mobile Card View */}
      <div className="d-md-none">
        <Row>
          {data.map((item) => (
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
      </div>
    </Container>
  );
};

export default TrainerUserList;
  