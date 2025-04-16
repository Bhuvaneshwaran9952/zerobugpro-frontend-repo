import React, { useState } from "react";
import { Navbar, Nav, Form, InputGroup, Button, Container, Badge, Dropdown } from "react-bootstrap";
import { FaSearch, FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";


const NavbarComponent = () => {
  const [search, setSearch] = useState("");

  return (
    <>
    
    <Navbar bg="white" variant="white" expand="lg" className="mb-3">
    <Sidebar/>
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav"/>
        <Navbar.Collapse id="navbar-nav ">
          <Nav className="me-auto" >
            <Form className="d-flex">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="secondary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>
          </Nav>

          <Nav >
            <Nav.Link href="#" className="me-2">
              <FaBell size={20} />
              <Badge bg="danger">3</Badge>
            </Nav.Link>
            <Nav.Link href="#" className="me-2">
              <FaEnvelope size={20} />
              <Badge bg="danger">5</Badge>
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                <FaUser size={10} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Profile</Dropdown.Item>
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Item href="#">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default NavbarComponent;
