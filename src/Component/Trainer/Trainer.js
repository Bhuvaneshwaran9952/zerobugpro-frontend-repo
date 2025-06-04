import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTrainer } from "../../Redux/TrainerReducer";
import Select from "react-select";
import { createTrainer,getAllTrainer } from "../../Server/TrainerServer";

const Trainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trainerList, setTrainerList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: [],
    address: ""
  });

  const [errors, setErrors] = useState({});

  const trainingSubjects = [
    "HTML", "CSS", "Bootstrap", "JavaScript", "Python", "Django",
    "React Js", "Angular Js", "Selenium", "Digital Marketing"
  ];

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await getAllTrainer();
      setTrainerList(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter you email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.contact.trim()) {
      newErrors.contact = "Please enter your contect number";
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be 10 digits";
    }
    if (formData.subject.length === 0) newErrors.subject = "At least one subject must be selected";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      subject: selectedOptions.map(option => option.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Submitting form data:", formData);
      const response = await createTrainer(formData);
      setTrainerList(prevList => [...(Array.isArray(prevList) ? prevList : []), response.data]);
      setFormData({ name: "", email: "", contact: "", subject: [], address: "" });
      setError("");
      setSuccess("Trainer registered successfully!");
      
      // Optionally navigate after a delay, or remove navigate to stay on page
      // setTimeout(() => navigate("/trainer"), 2000);
    } catch (error) {
      console.error("Full error object:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      setError("Failed to save trainer. Please try again.");
      setSuccess("");
    }
  };




  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>  
          <Card className="p-3 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white">
              <h4 className="mb-0">Training Registration</h4>
              <Link to="/trainer">
                <CloseButton variant="white" />
              </Link>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="tel" name="contact" value={formData.contact} onChange={handleChange} isInvalid={!!errors.contact} />
                  <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Training Subject</Form.Label>
                  <Select
                    isMulti
                    name="subject"
                    value={formData.subject.map(sub => ({ value: sub, label: sub }))}
                    options={trainingSubjects.map(sub => ({ value: sub, label: sub }))}
                    onChange={handleSubjectChange}
                    className={errors.subject ? "is-invalid" : ""}
                  />
                  {errors.subject && <div className="text-danger mt-1">{errors.subject}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" name="address" value={formData.address} onChange={handleChange} rows={3} isInvalid={!!errors.address} />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Trainer;