import PropTypes from "prop-types";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import getAvatar from "../../../utils/getAvatar";
import { useMemo } from "react";
import SwitchForm from "../../common/form/switchForm.jsx";

const NavDropdown = ({ onToggleTheme, darkTheme }) => {
  const profileIcon = useMemo(
    () => <Image src={getAvatar()} className="me-2" id="avatar-icon" />,
    []
  );

  const handleItemSelect = (eventKey) => {
    if (eventKey === "2_switchTheme") {
      onToggleTheme();
    }
  };

  return (
    <DropdownButton
      variant="light"
      title={<>{profileIcon} Username</>}
      onSelect={handleItemSelect}
    >
      <Dropdown.Item eventKey="1_profile" as={Link} to={"/profile"}>
        Профиль
      </Dropdown.Item>
      <Dropdown.Item eventKey="2_switchTheme">
        <SwitchForm label="Ночь" darkTheme={darkTheme} />
      </Dropdown.Item>
      <Dropdown.Item eventKey="3_settings" as={Link} to={"/settings"}>
        Настройки
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4_exit" as={Link} to={"/exit"}>
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
