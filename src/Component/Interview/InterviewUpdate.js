import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  CloseButton,
} from "react-bootstrap";

const InterviewUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logo: "",
    company: "",
    jobTitle: "",
    date: "",
    contact: "",
    email: "",
    location: "",
    details: "",
    information: "",
    skills: "",
    duration: "",
    experience: "",
  });
  const [errors, setErrors] = useState({});
  const [existingLogo, setExistingLogo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing data
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/interviews/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...data,
            skills: (data.skills || []).join(", "),
            logo: "", // Don't preload file input
          });
          setExistingLogo(data.logo_filename);
        } else {
          console.error("Failed to fetch interview");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchInterview();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    const regexPhone = /^[0-9]{10}$/;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.company) newErrors.company = "Company name is required.";
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.contact || !regexPhone.test(formData.contact))
      newErrors.contact = "Contact must be 10 digits.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.details) newErrors.details = "Details are required.";
    if (!formData.experience) newErrors.experience = "Experience are required."

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValid = validate();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    data.append("company", formData.company);
    data.append("jobTitle", formData.jobTitle);
    data.append("date", formData.date);
    data.append("contact", formData.contact);
    data.append("email", formData.email);
    data.append("location", formData.location);
    data.append("duration", formData.duration);
    data.append("experience", formData.experience);
    data.append("details", formData.details);
    data.append("information", formData.information);

    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    skillsArray.forEach((skill) => {
      data.append("skills", skill);
    });

    try {
      const response = await fetch(`http://127.0.0.1:8000/interviews/${id}`, {
        method: "PUT",
        body: data,
      });

      if (response.ok) {
        console.log("Interview updated successfully");
        navigate("/interviewcards");
      } else {
        console.error("Failed to update interview:", await response.text());
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <Card className="p-4 shadow-lg rounded-2xl">
        <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white mb-3">
          <h2 className="mb-0">Update Interview</h2>
          <Link to={"/interviewcards"}>
            <CloseButton variant="white" />
          </Link>
        </Card.Header>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formLogo">
                <Form.Label>Company Logo</Form.Label>
                {existingLogo && (
                  <div className="mb-2">
                    <img
                      src={`http://127.0.0.1:8000/static/${existingLogo}`}
                      alt="Existing Logo"
                      style={{ height: "80px", objectFit: "contain" }}
                    />
                  </div>
                )}
                <Form.Control
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  isInvalid={!!errors.logo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.logo}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.company}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.company}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.jobTitle}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.jobTitle}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.contact}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contact}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formLocation" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              isInvalid={!!errors.location}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formSkills" className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDuration" className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group controlId="formExperience" className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDetails" className="mb-3">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="details"
              value={formData.details}
              onChange={handleChange}
              isInvalid={!!errors.details}
            />
            <Form.Control.Feedback type="invalid">
              {errors.details}
            </Form.Control.Feedback>
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
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default InterviewUpdate;
