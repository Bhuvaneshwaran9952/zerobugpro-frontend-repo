import React, { useState, useEffect } from "react";
import { Table, Container, Button, Card, Pagination } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ViewPage.css";

const ViewPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentsPerPage] = useState(10); // Adjust the number of items per page

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

  // Calculate the assignments to show on the current page
  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            {currentAssignments.length > 0 ? (
              currentAssignments.map((assignment) => (
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
        
        {/* Pagination Component */}
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: Math.ceil(assignments.length / assignmentsPerPage) }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage < Math.ceil(assignments.length / assignmentsPerPage) ? currentPage + 1 : currentPage)}
              disabled={currentPage === Math.ceil(assignments.length / assignmentsPerPage)}
            />
          </Pagination>
        </div>
      </div>

      {/* Card View for Mobile Screens */}
      <div className="d-block d-md-none">
        {currentAssignments.length > 0 ? (
          currentAssignments.map((assignment) => (
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

        {/* Pagination for Mobile Screens */}
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          {Array.from({ length: Math.ceil(assignments.length / assignmentsPerPage) }).map((_, index) => (
            <Button
              key={index + 1}
              variant={index + 1 === currentPage ? "primary" : "outline-secondary"}
              className="mx-1"
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage < Math.ceil(assignments.length / assignmentsPerPage) ? currentPage + 1 : currentPage)}
            disabled={currentPage === Math.ceil(assignments.length / assignmentsPerPage)}
          >
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ViewPage;
