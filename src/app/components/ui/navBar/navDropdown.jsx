import PropTypes from "prop-types";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import getAvatar from "../../../utils/getAvatar";
import { useMemo } from "react";
import SwitchForm from "../../common/form/switchField";

const NavDropdown = ({ darkTheme, onSelect }) => {
  const avatarSrc = useMemo(() => getAvatar(), []);

  return (
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
  darkTheme: PropTypes.bool,
  onSelect: PropTypes.func
};

export default NavDropdown;
