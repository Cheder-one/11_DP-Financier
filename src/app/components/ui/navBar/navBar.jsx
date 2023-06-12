import PropTypes from "prop-types";
import NavDropdown from "./navDropdown";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

const NavBar = ({ onToggleTheme }) => {
  return (
    <Navbar bg="body-tertiary" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Financier
        </Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
          <Nav.Link as={Link} to={"/main"}>
            Главная
          </Nav.Link>
          <Nav.Link as={Link} to={"/analysis"}>
            Анализ
          </Nav.Link>
          <Nav.Link disabled as={Link} to={"/history"}>
            История
          </Nav.Link>
        </Nav>
        <NavDropdown {...{ onToggleTheme }} />
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  onToggleTheme: PropTypes.func.isRequired
};

export default NavBar;
