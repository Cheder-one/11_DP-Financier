import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

import { getBorderStyle } from "../../../utils";

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
  const [touched, setTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const handleToggle = (isOpen) => {
    setTouched(true);
    setIsOpen(isOpen);
  };

  useEffect(() => {
    if (touched && !isOpen && !value) {
      setIsValid(false);
    }
  }, [isOpen, touched, value]);

  const handleSelect = (eventKey) => {
    const selectedItem = JSON.parse(eventKey);

    onChange({
      target: {
        name,
        value: selectedItem
      }
    });

    setIsValid(true);
  };

  const borderStyle = getBorderStyle(touched, isOpen, isValid);

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
          className={isValid ? "" : "is-invalid"}
          style={borderStyle}
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
        <Form.Control.Feedback type="invalid" className="mt-1">
          {error}
        </Form.Control.Feedback>
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
