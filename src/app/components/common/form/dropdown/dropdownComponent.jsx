import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

import { getBorderStyle } from "../../../../utils";
import { useBlurOnSubmit } from "../../../../hooks";

const DropdownComponent = ({
  label,
  defaultValue,
  name,
  value,
  items,
  containerClass,
  isSubmit,
  onChange,
  error
}) => {
  const [isBlur, setIsBlur] = useBlurOnSubmit(isSubmit);
  const [isOpen, setIsOpen] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const handleToggle = (isOpen) => {
    setIsBlur(true);
    setIsOpen(isOpen);
  };

  useEffect(() => {
    if (isBlur && !isOpen && !value) {
      setIsValid(false);
    }
  }, [isOpen, isBlur, value]);

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

  const borderStyle = getBorderStyle(isBlur, isOpen, isValid);

  return (
    <Form.Group className={containerClass}>
      <Form.Label>{label}</Form.Label>

      <Dropdown drop="down" onSelect={handleSelect} onToggle={handleToggle}>
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
        {/* <Form.Control.Feedback type="invalid" className="mt-1">
          {error}
        </Form.Control.Feedback> */}
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
  containerClass: PropTypes.string,
  error: PropTypes.string,
  isSubmit: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default DropdownComponent;
