import PropTypes from "prop-types";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import SwitchTheme from "../switchers/switcher";
import getAvatar from "../../../utils/getAvatar";

const NavDropdown = ({ onToggleTheme }) => {
  const handleSelect = (eventKey, e) => {
    if (eventKey === "2") {
      console.log("2");
    }
  };

  const icon = useMemo(
    () => <Image src={getAvatar()} className="me-2" id="avatar-icon" />,
    []
  );

  return (
    <DropdownButton
      title={<>{icon} Username</>}
      variant="light"
      onSelect={handleSelect}
    >
      <Dropdown.Item eventKey="1" as={Link} to={"/profile"}>
        Профиль
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">
        <SwitchTheme label="Ночь" onClick={onToggleTheme} />
      </Dropdown.Item>
      <Dropdown.Item eventKey="3" as={Link} to={"/settings"}>
        Настройки
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4" as={Link} to={"/exit"}>
        Выйти
      </Dropdown.Item>
    </DropdownButton>
  );
};

NavDropdown.propTypes = {
  onToggleTheme: PropTypes.func.isRequired
};

export default NavDropdown;
