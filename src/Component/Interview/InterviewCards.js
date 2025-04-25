import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './InterviewCard.css'; // Importing the custom CSS

const InterviewCards = () => {
  const [interviewData, setInterviewData] = useState([]); // State to hold interview data
  const [loading, setLoading] = useState(true); // State to show loading text
  const [error, setError] = useState(null); // State to hold any errors
  const navigate = useNavigate(); // For navigation to detailed interview view

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        // Fetch interview data from the backend (API)
        const response = await axios.get("http://127.0.0.1:8000/interviews/");
        setInterviewData(response.data); // Update state with the fetched data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Error fetching data"); // Handle errors
        setLoading(false); // Set loading to false if error occurs
      }
    };

    fetchInterviews(); // Fetch interviews when component mounts
  }, []);

  // If data is still loading, display loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error fetching data, display error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 bg-secondary p-3">
        <h3 style={{ color: "white" }}>Upcoming Interviews</h3>
        <Button variant="success" onClick={() => navigate('/add-interview')}>
          + Add Interview
        </Button>
      </div>

      {/* Displaying the interview data as cards */}
      <Row>
        {interviewData.map((item) => (
          <Col key={item.id} md={4} sm={6} className="mb-4">
            <Card className="interview-card mb-3">
              <Card.Img
                variant="top"
                src={`http://127.0.0.1:8000/static/${item.logo_filename}`} 
                alt={`${item.company} Logo`}
                style={{ height: "120px", objectFit: "contain", padding: "1rem" }}
              />
              <Card.Body>
                <Card.Title>{item.company}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {item.date}</Card.Subtitle>
                <Card.Title className="mb-2 text-muted">
                  <h5>{item.jobTitle}</h5>
                </Card.Title>
                <Card.Text>{item.details}</Card.Text>
                {/* Button to view details of the specific interview */}
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => navigate(`/interview/${item.id}`)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InterviewCards;
