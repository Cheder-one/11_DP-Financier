import PropTypes from "prop-types";
import NavDropdown from "./navDropdown";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import ManualContainer from "../../common/typography/manualContainerContainer";

const NavBar = ({ onToggleTheme, darkTheme }) => {
  return (
    <Navbar bg="light" expand="sm">
      <ManualContainer className="mx-4">
        <Navbar.Brand as={Link} to={"/"}>
          <Image
            className="mb-1 me-2"
            src="src/app/assets/logo-8406819701_0d0145e2-be71-48bb-8c56-b618324b44eb.webp"
            style={{ width: "30px", borderRadius: "50%" }}
          />
          Financier
        </Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0">
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
        <NavDropdown {...{ onToggleTheme, darkTheme }} />
      </ManualContainer>
    </Navbar>
  );
};

NavBar.propTypes = {
  onToggleTheme: PropTypes.func,
  darkTheme: PropTypes.bool
};

export default NavBar;
