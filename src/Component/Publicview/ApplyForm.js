import React, { useState } from "react"; 
import { Container, Card, CloseButton, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplyForm = () => {
  const [formValue, setFormValue] = useState({
    resum: null,
    name: "",
    contact: "",
    email: "",
    location: "",
    skills: "",
    experience: "",
    currentsalary: "",
    expatsalary: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormValue(prev => ({
      ...prev,
      resum: e.target.files[0]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValue.resum) newErrors.resum = "Resume is required.";
    else if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(formValue.resum.type)) {
      newErrors.resum = "Only PDF or Word documents are allowed.";
    }

    if (!formValue.name.trim()) newErrors.name = "Name is required.";
    if (!formValue.contact.trim()) newErrors.contact = "Contact number is required.";
    else if (!/^\d{10}$/.test(formValue.contact)) newErrors.contact = "Contact must be 10 digits.";

    if (!formValue.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formValue.email)) newErrors.email = "Email is invalid.";

    if (!formValue.location.trim()) newErrors.location = "Location is required.";
    if (!formValue.skills.trim()) newErrors.skills = "Skills are required.";
    if (!formValue.experience.trim()) newErrors.experience = "Experience is required.";
    if (!formValue.currentsalary.trim()) newErrors.currentsalary = "Current salary is required.";
    if (!formValue.expatsalary.trim()) newErrors.expatsalary = "Expected salary is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('resum', formValue.resum);
      formData.append("name", formValue.name);
      formData.append("contact", formValue.contact);
      formData.append("email", formValue.email);
      formData.append("location", formValue.location);
      formData.append("skills", formValue.skills);
      formData.append("experience", formValue.experience);
      formData.append('current_salary', formValue.currentsalary);
      formData.append('expected_salary', formValue.expatsalary);
  
      try {
        const response = await axios.post("http://localhost:8000/apply/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("Success:", response.data);
        setSubmitted(true);
  
        // Wait 2 seconds then navigate
        setTimeout(() => {
          navigate('/publicview');
        }, 2000);
  
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setSubmitted(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg">
        <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white mb-3">
          <h2 className="mb-0">Apply Now</h2>
          <Link to={"/publicview"}>
            <CloseButton variant="white" />
          </Link>
        </Card.Header>

        <Form onSubmit={handleSubmit} noValidate>
          {submitted && <Alert variant="success">Form submitted successfully!</Alert>}
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formResum">
                <Form.Label>Resume</Form.Label>
                <Form.Control type="file" name="resum" onChange={handleFileChange} required />
                {errors.resum && <Form.Text className="text-danger">{errors.resum}</Form.Text>}
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formValue.name} onChange={handleChange} required />
                {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" name="contact" value={formValue.contact} onChange={handleChange} required />
                {errors.contact && <Form.Text className="text-danger">{errors.contact}</Form.Text>}
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formValue.email} onChange={handleChange} required />
                {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formLocation" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={formValue.location} onChange={handleChange} required />
            {errors.location && <Form.Text className="text-danger">{errors.location}</Form.Text>}
          </Form.Group>

          <Form.Group controlId="formSkill" className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control type="text" name="skills" value={formValue.skills} onChange={handleChange} required />
            {errors.skills && <Form.Text className="text-danger">{errors.skills}</Form.Text>}
          </Form.Group>

          <Form.Group controlId="formExperience" className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Control type="text" name="experience" value={formValue.experience} onChange={handleChange} required />
            {errors.experience && <Form.Text className="text-danger">{errors.experience}</Form.Text>}
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCurrentSalary" className="mb-3">
                <Form.Label>Current Salary (INR)</Form.Label>
                <Form.Control type="number" name="currentsalary" value={formValue.currentsalary} onChange={handleChange} required />
                {errors.currentsalary && <Form.Text className="text-danger">{errors.currentsalary}</Form.Text>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formExpatsalary" className="mb-3">
                <Form.Label>Expected Salary (INR)</Form.Label>
                <Form.Control type="number" name="expatsalary" value={formValue.expatsalary} onChange={handleChange} required />
                {errors.expatsalary && <Form.Text className="text-danger">{errors.expatsalary}</Form.Text>}
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
          <Button variant="primary" type="submit" className="p-2">
            Submit
          </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ApplyForm;
