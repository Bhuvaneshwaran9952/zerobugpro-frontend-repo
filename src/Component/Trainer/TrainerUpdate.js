import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import Select from "react-select";
import {getTrainerById, updateTrainer} from "../../Server/TrainerServer"

const TrainerUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const trainingSubjects = [
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "Bootstrap", label: "Bootstrap" },
        { value: "JavaScript", label: "JavaScript" },
        { value: "Python", label: "Python" },
        { value: "Django", label: "Django" },
        { value: "React Js", label: "React Js" },
        { value: "Angular Js", label: "Angular Js" },
        { value: "Selenium", label: "Selenium" },
        { value: "Digital Marketing", label: "Digital Marketing" }
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        subject: [],
        address: "",
        is_active: true,
    });

    useEffect(() => {
        fetchTrainerData();
        console.log("Trainer ID:", id);
    }, [id]);

    const fetchTrainerData = async () => {
    try {
        const fetchedData = await getTrainerById(id);
        setFormData({
        name: fetchedData.name || "",
        email: fetchedData.email || "",
        contact: fetchedData.contact || "",
        subject: Array.isArray(fetchedData.subject)
            ? fetchedData.subject.map((sub) => ({ value: sub, label: sub }))
            : [],
        address: fetchedData.address || "",
        is_active: fetchedData.is_active ?? true,
        });
    } catch (error) {
        console.error("Error fetching trainer data:", error);
    }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubjectChange = (selectedOptions) => {
        setFormData({
            ...formData,
            subject: selectedOptions || []
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateTrainer(id, {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        subject: formData.subject.map((sub) => sub.value),
        address: formData.address,
        is_active: formData.is_active,
        });
        navigate("/trainer");
    } catch (error) {
        console.error("Error updating trainer:", error.response?.data || error);
    }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="d-flex justify-content-between  bg-secondary  align-items-center">
                            <h5 className="mb-0">Training Update Form</h5>
                            <Link to="/trainer">
                                <CloseButton />
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name="name" value={formData.name || ""} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" value={formData.email || ""} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Contact Number</Form.Label>
                                            <Form.Control type="tel" name="contact" value={formData.contact || ""} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Training Subject</Form.Label>
                                            <Select
                                                isMulti
                                                name="subject"
                                                value={formData.subject}
                                                options={trainingSubjects}
                                                onChange={handleSubjectChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control as="textarea" name="address" value={formData.address || ""} onChange={handleChange} rows={3} required />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Button variant="primary" type="submit">Update Trainer</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TrainerUpdate;
