import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const PaymentRepeatedUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    payment_method: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/repeatedpayments/${id}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/repeatedpayments/${id}`, formData);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/paymentrepeated");
      }, 3000); // Alert will disappear after 3 seconds
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Update Payment</h3>
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          Payment updated successfully!
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact</Form.Label>
          <Form.Control type="text" name="contact" value={formData.contact} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control type="text" name="payment_method" value={formData.payment_method} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Payment
        </Button>
      </Form>
    </Container>
  );
};

export default PaymentRepeatedUpdate;
