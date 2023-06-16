import PropTypes from "prop-types";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import getAvatar from "../../../utils/getAvatar";
import { useMemo } from "react";
import SwitchForm from "../../common/form/switchField";

const NavDropdown = ({ onToggleTheme, darkTheme }) => {
  const avatarSrc = useMemo(() => getAvatar(), []);

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
    <DropdownButton
      variant="light"
      title={
        <>
          <Image src={avatarSrc} className="me-2" id="avatar-icon" />
          Username
        </>
      }
      onSelect={handleItemSelect}
    >
      <Dropdown.Item eventKey="1_profile" as={Link} to={"/profile"}>
        Профиль
      </Dropdown.Item>
      <Dropdown.Item eventKey="switchTheme">
        <SwitchForm label="Ночь" darkTheme={darkTheme} />
      </Dropdown.Item>
      <Dropdown.Item eventKey="3_settings" as={Link} to={"/settings"}>
        Настройки
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="exit" href={"/"}>
        Выйти
      </Dropdown.Item>
    </DropdownButton>
  );
};

NavDropdown.propTypes = {
  onToggleTheme: PropTypes.func,
  darkTheme: PropTypes.bool
};

export default NavDropdown;
