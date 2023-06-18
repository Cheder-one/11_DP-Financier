import PropTypes from "prop-types";
import NavDropdown from "./navDropdown";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import HeaderContainer from "../../common/typography/headerContainer";
import LOGO_SRC from "../../../assets/logo";

const NavBar = ({ onToggleTheme, darkTheme }) => {
  const handleItemSelect = (eventKey) => {
    switch (eventKey) {
      case "switchTheme":
        onToggleTheme();
        return;
      case "exit":
        localStorage.removeItem("email");
        localStorage.removeItem("password");
    }
  };

  return (
    <Navbar bg="light" expand="sm">
      <HeaderContainer className="mx-4">
        <Navbar.Brand as={Link} to={"/"}>
          <Image
            className="mb-1 me-1"
            src={LOGO_SRC}
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
        <NavDropdown onSelect={handleItemSelect} {...{ darkTheme }} />
      </HeaderContainer>
    </Navbar>
  );
};

NavBar.propTypes = {
  onToggleTheme: PropTypes.func,
  darkTheme: PropTypes.bool
};

export default NavBar;
