import PropTypes from "prop-types";
import NavBarDropdown from "./navBarDropdown";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import HeaderContainer from "../../common/typography/headerContainer";
import LOGO_SRC from "../../../assets/logo";
import { useEffect, useRef, useState } from "react";

const NavBar = ({ onToggleTheme, darkTheme }) => {
  const [activeLink, setActiveLink] = useState(useLocation().pathname);
  const prevHrefRef = useRef();

  useEffect(() => {
    prevHrefRef.current = activeLink;
  }, [activeLink]);

  const handleClick = ({ target }) => {
    const currentHref = target.getAttribute("href");
    const prevHref = prevHrefRef.current;

    setActiveLink(currentHref || prevHref);
  };

  const handleItemSelect = (eventKey) => {
    switch (eventKey) {
      case "switch-theme":
        onToggleTheme();
        return;
      case "exit":
        localStorage.removeItem("email");
        localStorage.removeItem("password");
    }
  };

  return (
    <Navbar bg="light" expand="sm" onClick={handleClick}>
      <HeaderContainer className="mx-4">
        <Navbar.Brand as={Link} to={"/"}>
          <Image
            className="mb-1 me-2"
            src={LOGO_SRC}
            style={{ width: "30px", borderRadius: "50%" }}
          />
          Financier
        </Navbar.Brand>

        <Nav className="sm:mr-auto my-2 my-lg-0">
          <Nav.Link as={Link} to={"/main"} active={activeLink === "/main"}>
            Главная
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={"/analysis"}
            active={activeLink === "/analysis"}
          >
            Анализ
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={"/history"}
            active={activeLink === "/history"}
          >
            История
          </Nav.Link>
        </Nav>

        <NavBarDropdown onSelect={handleItemSelect} {...{ darkTheme }} />
      </HeaderContainer>
    </Navbar>
  );
};

NavBar.propTypes = {
  onToggleTheme: PropTypes.func,
  darkTheme: PropTypes.bool
};

export default NavBar;
