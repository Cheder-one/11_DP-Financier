import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";

import LOGO_SRC from "../../../assets/logo/logo";
import HeaderContainer from "../../common/typography/headerContainer";
import { ThemeContext } from "../../common/theme/ThemeContext";
import NavBarDropdown from "./navBarDropdown";

const NavBar = () => {
  const { darkTheme, handleToggleTheme } = useContext(ThemeContext);
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
        handleToggleTheme();
        return;
      case "exit":
        localStorage.removeItem("email");
        localStorage.removeItem("password");
    }
  };

  return (
    <Navbar bg="light" expand="sm" onClick={handleClick}>
      <HeaderContainer className="mx-4">
        <Navbar.Brand as={Link} to={"/"} className="mt-0.5">
          <img
            alt="LOGO"
            src={LOGO_SRC}
            width="30"
            height="30"
            className="d-inline-block items-center mb-1 me-2 rounded-2xl"
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
  handleToggleTheme: PropTypes.func,
  darkTheme: PropTypes.bool
};

export default NavBar;
