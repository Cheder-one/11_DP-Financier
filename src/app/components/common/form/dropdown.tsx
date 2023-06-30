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
              className=""
            >
              <NavDropdown.Item>Все</NavDropdown.Item>
              <NavDropdown.Divider className="my-1" />
              <NavDropdown.Item>Счет 1</NavDropdown.Item>
              <NavDropdown.Item>Счет 2</NavDropdown.Item>
              <NavDropdown.Item>Счет 3</NavDropdown.Item>
              <NavDropdown.Item>Счет 3</NavDropdown.Item>
              <NavDropdown.Item>Счет 3</NavDropdown.Item>
              <NavDropdown.Item>Счет 3</NavDropdown.Item>
              <NavDropdown.Item>Счет 3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Dropdown;
