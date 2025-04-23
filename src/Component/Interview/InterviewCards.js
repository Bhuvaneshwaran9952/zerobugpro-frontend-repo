import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './InterviewCard.css';

// Import images
import googleImage from '../../Images/google.jpg';
import itImage from '../../Images/It.png';
import neotericImage from '../../Images/neoteric.jpg';
// You can import more images as needed

const InterviewCards = () => {
  const [interviews, setInterviews] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const navigate = useNavigate();
  const today = new Date();

  useEffect(() => {
    // Fetch data from backend API
    const fetchInterviews = async () => {
      try {
        const res = await fetch("http://localhost:8000/interviews/");
        const data = await res.json();
        setInterviews(data);
      } catch (error) {
        console.error("Failed to load interviews:", error);
      }
    };

    fetchInterviews();
  }, []);

  const toggleCard = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  // Function to dynamically get the image for each card based on interview company or some identifier
  const getImageForCard = (companyName) => {
    if (companyName === "Google") {
      return googleImage;
    }
    if (companyName === "Microsoft") {
      return itImage;
    }
    if (companyName === "Amazon") {
      return neotericImage;
    }
    return null; 
  };

  return (
    <Container className="mt-4">
      <Row>
        {interviews.map((item) => {
          const interviewDate = new Date(item.date);
          const isExpired = interviewDate < today;

          return (
            <Col key={item.id} md={4} sm={6} className="mb-4">
              <Card className={`interview-card mb-3 ${isExpired ? 'expired-card' : ''}`}>
                {/* Display image dynamically based on company */}
                <Card.Img
                  variant="top"
                  src={getImageForCard(item.company)} 
                  alt={`${item.company} Logo`}
                  style={{ height: "120px", objectFit: "contain", padding: "1rem" }}
                />
                <Card.Body>
                  <Card.Title>
                    {item.company}
                    {isExpired && <Badge bg="secondary" className="ms-2">Expired</Badge>}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Date: {item.date}</Card.Subtitle>
                  <Card.Title className="mb-2 text-muted">
                    <h5>{item.job_title}</h5>
                  </Card.Title>
                  <Card.Text>{item.details}</Card.Text>
                  {expandedCardId === item.id && (
                    <div className="mt-3">
                      <p><strong>More Info:</strong> {item.extra_info}</p>
                    </div>
                  )}
                  {!isExpired && (
                    <Button variant="info" size="sm" onClick={() => navigate(`/interview/${item.id}`)}>
                      View Details
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default InterviewCards;
