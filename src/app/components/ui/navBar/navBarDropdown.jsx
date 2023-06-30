import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import {
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
  NavDropdown,
  Navbar
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import SwitchForm from "../../common/form/switchField";
import { getAvatar } from "../../../utils";

const NavBarDropdown = ({ darkTheme, onSelect }) => {
  const avatarSrc = useMemo(() => getAvatar(), []);

  return (
    <>
      {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton> */}

      {/* <Navbar bg="" className="d-inline-block items-center ">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar-dark" />
          <Navbar.Collapse id="navbar">
            <Nav>
              <NavDropdown
                id="nav-dropdown"
                title={"DropdownName"}
                drop="down-centered"
                // menuVariant="dark"
                className="account-card text-black"
              >
                <NavDropdown.Item >Something</NavDropdown.Item>
                <NavDropdown.Item>Separated link</NavDropdown.Item>
                <NavDropdown.Item>Separated link</NavDropdown.Item>
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      <DropdownButton
        variant="light"
        title={
          <Navbar.Brand className="m-0 items-center">
            <img
              alt=""
              src={avatarSrc}
              width="30"
              height="30"
              className="inline-block items-center rounded-full"
            />{" "}
            <span className="font-normal text-base">Username</span>
          </Navbar.Brand>
        }
        onSelect={onSelect}
      >
        <Dropdown.Item eventKey="profile" as={Link} to={"/profile"}>
          Профиль
        </Dropdown.Item>
        <Dropdown.Item eventKey="switch-theme">
          <SwitchForm label="Ночь" darkTheme={darkTheme} />
        </Dropdown.Item>
        <Dropdown.Item eventKey="settings" as={Link} to={"/settings"}>
          Настройки
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="exit" href={"/"}>
          Выйти
        </Dropdown.Item>
      </DropdownButton>

      {/* <NavDropdown
        title={
          <>
            <Image src={avatarSrc} className="me-2" id="avatar-icon" />
            Username
          </>
        }
        drop={"down-centered"}
        onSelect={onSelect}
        className="me-3"
      >
        <NavDropdown.Item eventKey={"1_profile"} as={Link} to={"/profile"}>
          Профиль
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="switchTheme">
          <SwitchForm label="Ночь" darkTheme={darkTheme} />
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="3_settings" as={Link} to={"/settings"}>
          Настройки
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="exit" href={"/"}>
          Выйти
        </NavDropdown.Item>
      </NavDropdown> */}
    </>
  );
};

NavBarDropdown.propTypes = {
  darkTheme: PropTypes.bool,
  onSelect: PropTypes.func
};

export default NavBarDropdown;
