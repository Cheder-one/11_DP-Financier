import PropTypes from "prop-types";
import { Dropdown, DropdownButton, Navbar } from "react-bootstrap";
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
    </>
  );
};

NavBarDropdown.propTypes = {
  darkTheme: PropTypes.bool,
  onSelect: PropTypes.func
};

export default NavBarDropdown;
