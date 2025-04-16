import React, { useState, useEffect } from "react";
import { Table, Container, Button, Card } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ViewPage.css";

const ViewPage = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/view");
      setAssignments(response.data || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssignments([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/view/${id}`);
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <Container className="mt-4">
      <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
        <h2 className="mb-0">Schedule Classes</h2>
        <Link to="/trainer" className="text-white">
          <CloseButton />
        </Link>
      </div>

      {/* Table View for Larger Screens */}
      <div className="d-none d-md-block">
        <Table className="custom-table mt-3" bordered>
          <thead>
            <tr>
              <th>Trainer Name</th>
              <th>Subject</th>
              <th>Assigned Students</th>
              <th>Batch Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.trainerName || "N/A"}</td>
                  <td>{Array.isArray(assignment.subject) ? assignment.subject.join(", ") : "N/A"}</td>
                  <td>{Array.isArray(assignment.assignedStudents) ? assignment.assignedStudents.join(", ") : "N/A"}</td>
                  <td>{assignment.batchTime || "N/A"}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(assignment.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No assignments available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Card View for Mobile Screens */}
      <div className="d-block d-md-none">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Card key={assignment.id} className="mb-3 shadow-sm">
              <Card.Body>
                <h5 className="mb-2">
                  <strong>Trainer:</strong> {assignment.trainerName || "N/A"}
                </h5>
                <p><strong>Subject:</strong> {Array.isArray(assignment.subject) ? assignment.subject.join(", ") : "N/A"}</p>
                <p><strong>Students:</strong> {Array.isArray(assignment.assignedStudents) ? assignment.assignedStudents.join(", ") : "N/A"}</p>
                <p><strong>Batch Time:</strong> {assignment.batchTime || "N/A"}</p>
                <Button variant="danger" size="sm" onClick={() => handleDelete(assignment.id)}>Delete</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center mt-3">No assignments available</p>
        )}
      </div>
    </Container>
  );
};

export default ViewPage;
