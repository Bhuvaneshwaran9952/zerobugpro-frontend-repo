import React from "react";
import { Form, Button, Container, Row, Col, Card, CloseButton } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {createTrainerPayment} from "../../Server/TrainerPaymentServer";

// Validation Schema
const schema = yup.object().shape({
  trainer_name: yup.string().required("Trainer name is required"),
  payment_method: yup.string().required("Please select the payment method"),
  pay_amount: yup
    .number()
    .typeError("Pay amount must be a number")
    .positive("Amount must be positive")
    .required("Pay amount is required"),
  pending_payment: yup
    .number()
    .typeError("Pending payment must be a number")
    .min(0, "Pending payment cannot be negative")
    .required("Pending payment is required"),
  pay_date: yup.date().required("Pay date is required").typeError("Invalid date "),
  due_date: yup.date().required("Due date is required").typeError("Invalid date "),
});

const TrainerPaymentForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        pay_date: new Date(data.pay_date).toISOString().split('T')[0],
        due_date: new Date(data.due_date).toISOString().split('T')[0],
      };

      console.log("Payload being sent:", payload); // ✅ Confirm it's correct

      const response = await createTrainerPayment(payload);
      alert("Payment saved successfully!");
      navigate("/trainerpayment");
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Failed to save payment.");
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white">
          <h2 className="mb-0">Add Payment</h2>
          <Link to="/trainerpayment">
            <CloseButton variant="white" />
          </Link>
        </Card.Header>
        <Form onSubmit={handleSubmit(onSubmit)} className="p-3 border rounded bg-light">
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Label>Trainer Name</Form.Label>
              <Form.Control
                type="text"
                {...register("trainer_name")}
                isInvalid={!!errors.trainer_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.trainer_name?.message}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select {...register("payment_method")} isInvalid={!!errors.payment_method}>
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.payment_method?.message}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} md={6} className="mb-3">
              <Form.Label>Pay Amount</Form.Label>
              <Form.Control
                type="number"
                {...register("pay_amount")}
                isInvalid={!!errors.pay_amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pay_amount?.message}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} md={6} className="mb-3">
              <Form.Label>Pending Payment</Form.Label>
              <Form.Control
                type="number"
                {...register("pending_payment")}
                isInvalid={!!errors.pending_payment}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pending_payment?.message}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="mb-3">
              <Form.Label>Pay Date</Form.Label>
              <Form.Control
                type="date"
                {...register("pay_date")}
                isInvalid={!!errors.pay_date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pay_date?.message}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                {...register("due_date")}
                isInvalid={!!errors.due_date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.due_date?.message}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="text-center">
              <Button variant="success" type="submit" className="w-100 p-2">
                Save Payment
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default TrainerPaymentForm;
