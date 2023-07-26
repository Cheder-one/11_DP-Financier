import PropTypes from "prop-types";
import { Dropdown, DropdownButton, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { SwitchField } from "../../common/form";
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
              width="30"
              height="30"
              src={avatarSrc}
              className="inline-block items-center rounded-full"
            />
            <span className="font-normal text-base">Username</span>
          </Navbar.Brand>
        }
        onSelect={onSelect}
      >
        <Dropdown.Item eventKey="profile" as={Link} to={"/profile"}>
          Профиль
        </Dropdown.Item>
        <Dropdown.Item eventKey="switch-theme">
          <SwitchField label="Ночь" isCheck={darkTheme} />
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
