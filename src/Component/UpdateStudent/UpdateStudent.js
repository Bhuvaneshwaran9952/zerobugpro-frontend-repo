import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchUserObj, FunctionUpdateUser } from "../../Redux/Action";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Container, Row, Col, Button, Card } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";

const UpdateUser = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState("");
    const [payment, setPayment] = useState("");
    const [answer, setAnswer] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [selectCity, setSelectCity] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const [certificate, setCertificate] = useState("")

    const userobj = useSelector((state) => state.user.userobj);
    console.log("userobj is:", userobj, typeof userobj);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();

    useEffect(() => {
        dispatch(FetchUserObj(code));
      }, [dispatch, code]);

    useEffect(() => {
        if (userobj) {
            setId(userobj.id);
            setName(userobj.name);
            setEmail(userobj.email);
            setPhone(userobj.phone);
            setCourse(userobj.course);
            setSelectCity(userobj.selectCity);
            setDateTime(userobj.dateTime);
            setPayment(userobj.payment);
            setAddress(userobj.address);
            setStatus(userobj.status);
            setCertificate(userobj.certificate);
        }
    }, [userobj]);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
        if (e.target.value === "No") {
            setDateTime("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer === "Yes" && !dateTime) {
            alert("Please select a date and time.");
            return;
        }
        const updatedUser = { id, name, email, phone, course, selectCity, dateTime, payment, address, answer, status, certificate };
        dispatch(FunctionUpdateUser(updatedUser, id));
        navigate("/studentlist");
    };

    return (
        <Container fluid className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white">
                            <h2 className="mb-0">Enquiry System</h2>
                            <Link to={'/studentlist'}><CloseButton variant="white" /></Link>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Id</Form.Label>
                                            <Form.Control type="text" value={id || ""} disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={name || ""} onChange={e => setName(e.target.value)} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={email || ""} onChange={e => setEmail(e.target.value)} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="text" value={phone || ""} onChange={e => setPhone(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Course</Form.Label>
                                            <Form.Select value={course || ""} onChange={e => setCourse(e.target.value)}>
                                                <option value="">Select a course</option>
                                                <option value="Python">Python</option>
                                                <option value="Django">Django</option>
                                                <option value="Reactjs">React Js</option>
                                                <option value="Angularjs">Angular Js</option>
                                                <option value="Selenium">Selenium</option>
                                                <option value="Digital marketing">Digital Marketing</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Select Your City</Form.Label>
                                            <Form.Select value={selectCity || ""} onChange={e => setSelectCity(e.target.value)}>
                                                <option value="">Select a city</option>
                                                <option value="Chennai">Chennai</option>
                                                <option value="Bangalore">Bangalore</option>
                                                <option value="Hyderabad">Hyderabad</option>
                                                <option value="Pune">Pune</option>
                                                <option value="Other">Other</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Form.Group>
                                        <Form.Label>Do you need a demo class?</Form.Label>
                                        <div>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Yes"
                                                value="Yes"
                                                checked={answer === "Yes"}
                                                onChange={handleAnswerChange}
                                                name="demo"
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="No"
                                                value="No"
                                                checked={answer === "No"}
                                                onChange={handleAnswerChange}
                                                name="demo"
                                            />
                                        </div>
                                    </Form.Group>

                                    {answer === "Yes" && (
                                        <Form.Group>
                                            <Form.Label>Select Date & Time</Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                                value={dateTime || ""}
                                                onChange={e => setDateTime(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    )}

                                    <Form.Group>
                                        <Form.Label>Payment Method</Form.Label>
                                        <Form.Select
                                            value={payment || ""}
                                            onChange={e => setPayment(e.target.value)}
                                            required
                                        >
                                            <option value="">Select a payment method</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Card">Card</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Card">Bank Transfer</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control as="textarea" rows={2} value={address || ""} onChange={e => setAddress(e.target.value)} required />
                                        </Form.Group>
                                    </Col>

                                    <Form.Group>
                                        <Form.Label>Student Status</Form.Label>
                                        <Form.Select value={status || ""} onChange={e => setStatus(e.target.value)} required>
                                            <option value="">Select a status</option>
                                            <option value="Enrolled">Enrolled</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Do you need a certificate?</Form.Label>
                                        <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            value="Yes"
                                            label="Yes"
                                            checked={certificate === "Yes"}
                                            onChange={(e) => setCertificate(e.target.value)}
                                            name="certificate"/>

                                        <Form.Check
                                            inline
                                            type="radio"
                                            value="No"
                                            label="No"
                                            checked={certificate === "No"}
                                            onChange={(e) => setCertificate(e.target.value)}/>
                                        </div>
                                    </Form.Group>

                                </Row>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button type="submit" variant="primary">Update</Button>
                                    <Link className="btn btn-danger" to={'/studentlist'}>Back</Link>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateUser;
