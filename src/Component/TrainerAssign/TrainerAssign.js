import React, { useState, useEffect } from "react";
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TrainerAssign = () => {
  const { trainerId } = useParams(); 
  const navigate = useNavigate();

  const [trainerName, setTrainerName] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [batchTime, setBatchTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrainer();
    fetchStudents();
  }, []);

  const fetchTrainer = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/trainer/${trainerId}`);
      setTrainerName(response.data.name || "N/A");
      setSubject(response.data.subject || "N/A");
    } catch (error) {
      console.error("Error fetching trainer:", error);
      setError("Failed to load trainer details.");
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/");
      setStudents(response.data.map(student => ({ value: student.id, label: student.name })));
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to load students.");
    }
  };

  const formatTimeTo24Hour = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour.padStart(2, "0")}:${minute}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!trainerName || !subject || selectedStudents.length === 0 || !batchTime) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError("");

    const assignedData = {
      trainerId,
      trainerName,
      subject,
      assignedStudents: selectedStudents.map((s) => s.label),
      batchTime: formatTimeTo24Hour(batchTime) 
    };

    try {
      await axios.post("http://127.0.0.1:8000/view", assignedData);
      alert("Assignment saved successfully!");
      navigate("/viewpage");
    } catch (error) {
      console.error("Error saving assignment:", error);
      setError("Failed to save assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="mb-3">Assign Students</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Trainer Name</Form.Label>
            <Form.Control type="text" value={trainerName} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" value={subject} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assign Students</Form.Label>
            <Select
              options={students}
              isMulti
              onChange={setSelectedStudents}
              placeholder="Select students..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Batch Time</Form.Label>
            <Form.Control 
              type="time" 
              value={batchTime} 
              onChange={(e) => setBatchTime(e.target.value)} 
              required 
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
          {' '}
          <Button variant="secondary" onClick={() => navigate("/trainer")} disabled={loading}>
            Back
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default TrainerAssign;
