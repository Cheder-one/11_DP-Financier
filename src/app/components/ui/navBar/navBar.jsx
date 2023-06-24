import PropTypes from "prop-types";
import NavBarDropdown from "./navBarDropdown";
import { Link, useLocation } from "react-router-dom";
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
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light"
      onClick={handleClick}
    >
      <HeaderContainer>
        <a className="navbar-brand" href="/">
          <img
            className="mb-1 me-2"
            src={LOGO_SRC}
            style={{ width: "30px", borderRadius: "50%" }}
            alt="logo"
          />
          Financier
        </a>
        <ul className="navbar-nav me-auto my-2 my-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link${activeLink === "/main" ? " active" : ""}`}
              to="/main"
            >
              Главная
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link${
                activeLink === "/analysis" ? " active" : ""
              }`}
              to="/analysis"
            >
              Анализ
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link${
                activeLink === "/history" ? " active" : ""
              }`}
              to="/history"
            >
              История
            </Link>
          </li>
        </ul>
        <NavBarDropdown onSelect={handleItemSelect} {...{ darkTheme }} />
      </HeaderContainer>
    </nav>
  );
};

const HeaderContainer = ({ children }) => (
  <div className="d-flex justify-content-between align-items-center w-100 mx-4">
    {children}
  </div>
);

NavBar.propTypes = {
  onToggleTheme: PropTypes.func,
  darkTheme: PropTypes.bool
};

HeaderContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default NavBar;
