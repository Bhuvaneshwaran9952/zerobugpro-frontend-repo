import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card,CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const InterviewForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logo: "",
    company: "",
    jobTitle: "",
    date: "",
    contact: "",
    location: "",
    details: "",
    information: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("logo", formData.logo);
    data.append("company", formData.company);
    data.append("jobTitle", formData.jobTitle);
    data.append("date", formData.date);
    data.append("contact", formData.contact);
    data.append("location", formData.location);
    data.append("details", formData.details);
    data.append("information", formData.information);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/interviews/", {
        method: "POST",
        body: data,
      });
  
      if (response.ok) {
        console.log("Interview submitted successfully");
        navigate("/interviewcards");
      } else {
        console.error("Failed to submit interview:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg rounded-2xl">
        <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white mb-3">
            <h2 className="mb-0">Add Interview</h2>
            <Link to={'/interviewcards'}>
                <CloseButton variant="white" />
            </Link>
        </Card.Header>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formLogo">
                <Form.Label>Company Logo</Form.Label>
                <Form.Control
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formCompany">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formDetails" className="mb-3">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formInformation" className="mb-3">
            <Form.Label>Additional Information</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="information"
              value={formData.information}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" className="px-4">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default InterviewForm;