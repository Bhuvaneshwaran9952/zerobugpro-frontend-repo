import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Cards.css';

const Cards = () => {
  const [interviewData, setInterviewData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/interviews/");
        setInterviewData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = interviewData.filter(
      (item) =>
        item.jobTitle.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  }, [searchTerm, interviewData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 bg-secondary p-3 rounded">
        <h3 style={{ color: "white" }}>Upcoming Interviews</h3>
      </div>

      {/* Search Bar */}
      <Form className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <Form.Control
            type="text"
            placeholder="Search by Job title or Location ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Form>

      {/* Interview Cards */}
      <Row>
        {filteredData.length === 0 ? (
          <div className="text-muted px-3">No interviews found.</div>
        ) : (
          filteredData.map((item) => (
            <Col key={item.id} md={4} sm={6} className="mb-4 d-flex">
            <Card
            className={`interview-card w-100 ${
                new Date(item.date) < new Date().setHours(0, 0, 0, 0)
                ? "expired-card"
                : ""
            }`}
            onClick={() => {
                const isExpired = new Date(item.date) < new Date().setHours(0, 0, 0, 0);
                if (!isExpired) {
                navigate(`/apply/${item.id}`);
                }
            }}
            style={{ cursor: "pointer" }}
            >
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:8000/static/${item.logo_filename}`}
                  alt={`${item.company} Logo`}
                  style={{
                    height: "120px",
                    objectFit: "contain",
                    padding: "1rem",
                  }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.company}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Date: {item.date}
                    </Card.Subtitle>
                    <h5 className="mb-2 text-muted">{item.jobTitle}</h5>
                    <p>
                      <strong className="mb-2 text-muted">{item.location}</strong>
                    </p>
                    <Card.Text
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "4.5rem",
                      }}
                    >
                      {item.details}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Cards;
