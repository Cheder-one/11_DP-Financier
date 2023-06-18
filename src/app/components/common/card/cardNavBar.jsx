import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const CardNavBar = () => {
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand className="fs-6 " href="#home">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>{" "}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CardNavBar;
