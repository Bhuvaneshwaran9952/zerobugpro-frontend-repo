import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../../Redux/Action";
import { Form, Container, InputGroup, Button, Card, Row, Col } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { useState } from "react";
import { TfiReload } from "react-icons/tfi";

// Function to generate a random CAPTCHA string
const generateCaptcha = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

// Validation Schema
const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email("Invalid email format").required("Please enter your email"),
    phone: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Please enter your contact number"),
    course: yup.string().required("Please select a course"),
    selectCity: yup.string().required("Please select a city"),
    payment: yup.string().required("Please select a payment method"),
    address: yup.string().required("Please enter your address"),
    answer: yup.string().required("Please select Yes or No"),
    dateTime: yup
        .string()
        .when("answer", {
            is: "Yes",
            then: (schema) => schema.required("Please select a date and time"),
            otherwise: (schema) => schema.notRequired(),
        }),
});

const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const answer = watch("answer");

    // CAPTCHA state
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userCaptcha, setUserCaptcha] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    const handleRefreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setUserCaptcha("");
        setCaptchaError("");
    };

    const onSubmit = (data) => {
        if (userCaptcha !== captcha) {
            setCaptchaError("Incorrect CAPTCHA. Please try again.");
            return;
        }

        // If "No" is selected, clear dateTime
        if (data.answer === "No") {
            data.dateTime = "";
        }

        console.log("🚀 Submitting Data:", JSON.stringify(data, null, 2)); // Debugging Step

        dispatch(FunctionAddUser(data));
        navigate("/user");
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white">
                            <h2 className="mb-0">Enquiry System</h2>
                            <Link to={'/studentlist'}>
                                <CloseButton variant="white" />
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" {...register("name")} isInvalid={!!errors.name} />
                                    <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" {...register("email")} isInvalid={!!errors.email} />
                                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" {...register("phone")} isInvalid={!!errors.phone} />
                                    <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Course</Form.Label>
                                    <Form.Select {...register("course")} isInvalid={!!errors.course}>
                                        <option value="">Select a course</option>
                                        <option value="Python">Python</option>
                                        <option value="Django">Django</option>
                                        <option value="Reactjs">React Js</option>
                                        <option value="Angularjs">Angular Js</option>
                                        <option value="Selenium">Selenium</option>
                                        <option value="Digital marketing">Digital Marketing</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.course?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Select Your City</Form.Label>
                                    <Form.Select {...register("selectCity")} isInvalid={!!errors.selectCity}>
                                        <option value="">Select a city</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Bangalore">Bangalore</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.selectCity?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Do you need a demo class?</Form.Label>
                                    <div>
                                        <Form.Check inline type="radio" label="Yes" value="Yes" {...register("answer")} />
                                        <Form.Check inline type="radio" label="No" value="No" {...register("answer")} />
                                    </div>
                                    <p className="text-danger">{errors.answer?.message}</p>
                                </Form.Group>

                                {answer === "Yes" && (
                                    <Form.Group>
                                        <Form.Label>Select Date & Time</Form.Label>
                                        <Form.Control type="datetime-local" {...register("dateTime")} isInvalid={!!errors.dateTime} />
                                        <Form.Control.Feedback type="invalid">{errors.dateTime?.message}</Form.Control.Feedback>
                                    </Form.Group>
                                )}

                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control as="textarea" rows={2} {...register("address")} isInvalid={!!errors.address} />
                                    <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
                                </Form.Group>

                                {/* CAPTCHA Section */}
                                <Form.Group>
                                    <Form.Label>CAPTCHA</Form.Label>
                                    <InputGroup className="mb-2">
                                        <Form.Control type="text" value={captcha} readOnly className="bg-secondary text-white" />
                                        <Button variant="outline-secondary" onClick={handleRefreshCaptcha}>
                                            <TfiReload />
                                        </Button>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Enter CAPTCHA</Form.Label>
                                    <Form.Control type="text" value={userCaptcha} onChange={(e) => setUserCaptcha(e.target.value)} />
                                    <p className="text-danger">{captchaError}</p>
                                </Form.Group>

                                <div className="d-flex justify-content-between mt-3">
                                    <Button type="submit" variant="primary">Submit</Button>
                                    <Link className="btn btn-danger" to={'/user'}>Back</Link>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddUser;
