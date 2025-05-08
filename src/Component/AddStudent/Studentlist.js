import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, RemoveUser } from "../../Redux/Action";
import { Container, Table, Button, Card, Row, Col } from "react-bootstrap";

const Userlist = (props) => {
    useEffect(() => {
        props.loaduser();
    }, []);

    const handleDelete = (code) => {
        if (window.confirm('Do you want to remove?')) {
            props.removeuser(code);
            props.loaduser();
            toast.success('User removed successfully.');
        }
    };

    return (
        <Container className="mt-4">
            {props.user.loading ? (
                <div><h2>Loading...</h2></div>
            ) : props.user.errmessage ? (
                <div><h2>{props.user.errmessage}</h2></div>
            ) : (
                <div>
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
                            <h2 className="mb-0">Student List</h2>
                            <Link to={'/studentlist/add'} className="btn btn-warning">Add Student [+]</Link>
                        </div>

                        {/* Table for Desktop View */}
                        <div className="d-none d-md-block table-responsive">
                            <Table bordered>
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Course</th>
                                        <th>City</th>
                                        <th>Date & Time</th>
                                        <th>Payment Method</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                        <th>Certificate</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.user.userlist && props.user.userlist.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.course}</td>
                                            <td>{item.selectCity}</td>
                                            <td>{item.dateTime}</td>
                                            <td>{item.payment}</td>
                                            <td>{item.address}</td>
                                            <td>{item.status}</td>
                                            <td>{item.certificate}</td>
                                            <td className="text-center">
                                                <Link to={'/studentlist/edit/' + item.id} className="btn btn-primary me-2">Edit</Link>
                                                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        {/* Cards for Mobile View */}
                        <div className="d-md-none">
                            {props.user.userlist && props.user.userlist.length > 0 ? (
                                props.user.userlist.map((item, index) => (
                                    <Card key={item.id} className="mb-3 shadow-sm">
                                        <Card.Body>
                                            <Card.Title className="fw-bold">{item.name}</Card.Title>
                                            <Card.Text>
                                                <strong>Email:</strong> {item.email} <br />
                                                <strong>Phone:</strong> {item.phone} <br />
                                                <strong>Course:</strong> {item.course} <br />
                                                <strong>City:</strong> {item.selectCity} <br />
                                                <strong>Date & Time:</strong> {item.dateTime} <br />
                                                <strong>Payment Method:</strong> {item.payment} <br />
                                                <strong>Address:</strong> {item.address} <br />
                                                <strong>Status:</strong> {item.status} <br />
                                                <strong>Certificate:</strong> {item.certificate} <br />
                                            </Card.Text>
                                            <Row>
                                                <Col>
                                                    <Link to={'/studentlist/edit/' + item.id} className="btn btn-primary w-100 mb-2">Edit</Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="danger" size="sm" className="w-100" onClick={() => handleDelete(item.id)}>Delete</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center p-3">
                                    <h5>No users available</h5>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    loaduser: () => dispatch(FetchUserList()),
    removeuser: (code) => dispatch(RemoveUser(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);
