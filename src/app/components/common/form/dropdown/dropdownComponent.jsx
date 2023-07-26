import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

import { getBorderStyle } from "../../../../utils";
import { useBlurOnSubmit } from "../../../../hooks";
import { CustomToggleContainer, CustomToggle } from "../index";

const DropdownComponent = ({
  label,
  name,
  value,
  items,
  defaultValue,
  containerClass,
  isCustomToggle,
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

  const borderClass = getBorderStyle(isBlur, isOpen, isValid);

  const getDropdownClass = () => {
    return isValid ? borderClass : borderClass + " is-invalid";
  };

  return (
    <Form.Group className={containerClass}>
      <Form.Label>{label}</Form.Label>

      <Dropdown drop="down" onSelect={handleSelect} onToggle={handleToggle}>
        <Dropdown.Toggle
          as={isCustomToggle ? CustomToggleContainer : undefined}
          variant="light"
          className={getDropdownClass()}
        >
          {isCustomToggle ? (
            <CustomToggle borderClass={borderClass}>
              {value || defaultValue}
              <VscChevronDown className="pl-0.5" />
            </CustomToggle>
          ) : (
            value || defaultValue
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {items.map((item) => (
            <Dropdown.Item key={item.id} eventKey={JSON.stringify(item)}>
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>

        {error && (
          <Form.Control.Feedback type="invalid" className="mt-1">
            {error}
          </Form.Control.Feedback>
        )}
      </Dropdown>
    </Form.Group>
  );
};

DropdownComponent.defaultProps = {
  isCustomToggle: true
};

DropdownComponent.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  items: PropTypes.array.isRequired,
  containerClass: PropTypes.string,
  isCustomToggle: PropTypes.bool,
  isSubmit: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default DropdownComponent;
