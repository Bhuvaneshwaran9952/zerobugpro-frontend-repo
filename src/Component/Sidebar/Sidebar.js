import React, { useState } from "react";
import './sidebar.css';
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import { IoHomeSharp } from "react-icons/io5";  
import { FaUserAlt } from "react-icons/fa";
import { SiLinuxserver } from "react-icons/si";
import { FaMobileScreen } from "react-icons/fa6";
import { MdInsertChart } from "react-icons/md";
import { IoNotificationsCircle } from "react-icons/io5";
import { GrSystem } from "react-icons/gr";
import { MdPsychology } from "react-icons/md";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { SiTrainerroad } from "react-icons/si";
import { Link } from "react-router-dom"; 

const Sidebar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            {/* Navbar with Toggle Button */}
            <Navbar className="p-1 ms-3 d-flex justify-content-between align-items-center">
                <Button variant="light" onClick={handleShow} className="sidebar-toggle">
                    ☰ 
                </Button>
            </Navbar>

            {/* Sidebar with Responsive View */}
            <Offcanvas show={show} onHide={handleClose} backdrop="static" className="sidebar" placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="sidebar-title">Zerobug Academy</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <p className="sidebar-section">Main</p>
                        <Nav.Link to="/" as={Link} className="sidebar-item"><IoHomeSharp className="icon"/> Home</Nav.Link>
                        <Nav.Link to="/studentlist" as={Link} className="sidebar-item"><FaUserAlt className="icon"/> Student List</Nav.Link>
                        <Nav.Link to="/trainer" as={Link} className="sidebar-item"><SiTrainerroad className="icon"/> Trainer List</Nav.Link>
                        <Nav.Link to="/paymentdetails" as={Link} className="sidebar-item"><MdOutlinePayment className="icon"/> Student Payment </Nav.Link>
                        <Nav.Link to="/trainerpayment" as={Link} className="sidebar-item"><MdOutlinePayment className="icon"/> Trainer Payment</Nav.Link>
                        <Nav.Link as={Link}  className="sidebar-item"><FaMobileScreen className="icon"/> Contact</Nav.Link>

                        <p className="sidebar-section">Useful</p>
                        <Nav.Link as={Link}  className="sidebar-item"><MdInsertChart className="icon"/> Stats</Nav.Link>
                        <Nav.Link as={Link}  className="sidebar-item"><IoNotificationsCircle className="icon"/> Notification</Nav.Link>

                        <p className="sidebar-section">Service</p>
                        <Nav.Link as={Link}  className="sidebar-item"><GrSystem className="icon"/> System Health</Nav.Link>
                        <Nav.Link as={Link} className="sidebar-item"><MdPsychology className="icon"/> Logs</Nav.Link>
                        <Nav.Link as={Link}  className="sidebar-item"><MdOutlineSettingsApplications className="icon"/> Settings</Nav.Link>

                        <p className="sidebar-section">User</p>
                        <Nav.Link as={Link} className="sidebar-item"><MdAccountCircle className="icon"/> Profile</Nav.Link>
                        <Nav.Link as={Link}  className="sidebar-item"><IoLogOutOutline className="icon"/> Logout</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Sidebar;
