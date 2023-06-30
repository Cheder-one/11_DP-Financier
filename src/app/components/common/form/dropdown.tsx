import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const Dropdown = ({ name }) => {
  return (
    <Navbar className="p-0">
      <Container fluid>
        <Navbar.Collapse id="navbar">
          <Nav>
            <NavDropdown
              id="nav-dropdown"
              title={"DropdownName"}
              drop="down-centered"
            >
              <NavDropdown.Item>Все</NavDropdown.Item>
              <NavDropdown.Divider className="my-1" />
              <NavDropdown.Item>Счет 1</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Dropdown;
