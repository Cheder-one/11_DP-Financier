import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import SwitchTheme from "../../layout/switcher";

const NavDropdown = () => {
  function handleSelect(eventKey, e) {
    console.log(eventKey); // выведет "1"
    console.log(e.target.textContent); // выведет "Профиль"
  }

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <DropdownButton title={"Username"} variant="light" onSelect={handleSelect}>
      <Dropdown.Item eventKey="1" as={Link} to={"/profile"}>
        Профиль
      </Dropdown.Item>
      <Dropdown.Item eventKey="3">
        <SwitchTheme label="Toggle theme" onClick={handleClick} />
      </Dropdown.Item>
      <Dropdown.Item eventKey="4" as={Link} to={"/settings"}>
        Настройки
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="5" as={Link} to={"/exit"}>
        Выйти
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default NavDropdown;
