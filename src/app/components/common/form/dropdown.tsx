import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const Dropdown = ({ name }) => {
  return (
    <Navbar bg="">
      <Container fluid>
        {/* <Navbar.Toggle aria-controls="navbar-dark" /> */}
        <Navbar.Collapse id="navbar">
          <Nav>
            <NavDropdown
              id="nav-dropdown"
              title={"DropdownName"}
              drop="down-centered"
              // menuVariant="dark"
              className="account-card text-black"
            >
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Item>Separated link</NavDropdown.Item>
              <NavDropdown.Item>Separated link</NavDropdown.Item>
              <NavDropdown.Item>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Dropdown;
