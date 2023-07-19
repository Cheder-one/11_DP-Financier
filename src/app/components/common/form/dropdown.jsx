import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";
import { useState } from "react";

const DropdownComponent = ({
  label,
  defaultValue,
  name,
  value,
  items,
  className,
  error,
  onChange
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleSelect = (eventKey) => {
    const selectedItem = JSON.parse(eventKey);

    onChange({
      target: {
        name,
        value: selectedItem
      }
    });

    setIsValid(true); // При выборе значения считаем поле валидным
  };

  const handleToggle = (isOpen, event, metadata) => {
    if (!isOpen && !value) {
      setIsValid(false); // Если список был закрыт без выбора значения, считаем поле невалидным
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Dropdown
        className={className}
        drop="down"
        onSelect={handleSelect}
        onToggle={handleToggle}
      >
        <Dropdown.Toggle
          variant="light"
          className={`border ${isValid ? "" : "is-invalid"}`}
        >
          {value || defaultValue}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {items.map((item) => (
            <Dropdown.Item key={item.id} eventKey={JSON.stringify(item)}>
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Dropdown>
    </Form.Group>
  );
};

DropdownComponent.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default DropdownComponent;
