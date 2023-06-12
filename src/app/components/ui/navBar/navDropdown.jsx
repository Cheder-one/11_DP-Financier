import PropTypes from "prop-types";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import SwitchTheme from "../switchers/switcher";
import getAvatar from "../../../utils/getAvatar";

const profileIcon = (
  <Image src={getAvatar()} className="me-2" id="avatar-icon" />
);

const NavDropdown = () => {
  const handleItemSelect = (eventKey) => {
    console.log(eventKey);

    if (eventKey === "2_switchTheme") {
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
        <SwitchTheme label="Ночь" isChecked={}/>
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
  onToggleTheme: PropTypes.func
};

export default NavDropdown;
