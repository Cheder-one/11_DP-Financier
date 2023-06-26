import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { Dropdown, DropdownButton, Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import SwitchForm from "../../common/form/switchField";
import { getAvatar } from "../../../utils";

const NavBarDropdown = ({ darkTheme, onSelect }) => {
  const avatarSrc = useMemo(() => getAvatar(), []);

  return (
    <>
      <DropdownButton
        variant="light"
        title={
          <>
            <Image src={avatarSrc} className="me-2" id="avatar-icon" />
            Username
          </>
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
