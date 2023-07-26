import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

import { getBorderStyle } from "../../../../utils";
import { useBlurOnSubmit } from "../../../../hooks";
import { CustomToggleContainer, CustomToggle, InputField } from "../index";

const DropdownComponent = ({
  label,
  name,
  value,
  items,
  defaultValue,
  containerClass,
  isAdditionEnabled,
  isCustomToggle,
  isSubmit,
  onChange,
  error
}) => {
  const [isBlur, setIsBlur] = useBlurOnSubmit(isSubmit);
  const [isOpen, setIsOpen] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [isElemAdding, setIsElemAdding] = useState(false);

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

    if (selectedItem.id === "__addNew__") {
      setIsElemAdding(true);
      setIsValid(false);
    } else {
      onChange({
        target: {
          name,
          value: selectedItem
        }
      });
      setIsElemAdding(false);
      setIsValid(true);
    }
  };

  const borderClass = getBorderStyle(isBlur, isOpen, isValid);

  const getIsDropdownValid = () => {
    return isValid ? borderClass : borderClass + " is-invalid";
  };

  return (
    <Form.Group className={containerClass}>
      {label && <Form.Label>{label}</Form.Label>}
      <Dropdown onSelect={handleSelect} onToggle={handleToggle} show={isOpen}>
        <Dropdown.Toggle
          variant="light"
          className={getIsDropdownValid()}
          as={isCustomToggle ? CustomToggleContainer : undefined}
        >
          {isCustomToggle ? (
            <CustomToggle
              borderClass={borderClass}
              variant={isElemAdding ? "" : "light"}
            >
              {isElemAdding ? <InputField /> : value || defaultValue}
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

          {isAdditionEnabled && (
            <Dropdown.Item
              eventKey={JSON.stringify({ id: "__addNew__" })}
              className="text-blue-700 text-sm border-top"
            >
              Добавить категорию
            </Dropdown.Item>
          )}
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
  containerClass: "w-fit mt-3",
  isCustomToggle: true
};

DropdownComponent.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  items: PropTypes.array.isRequired,
  containerClass: PropTypes.string,
  isAdditionEnabled: PropTypes.bool,
  isCustomToggle: PropTypes.bool,
  isSubmit: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default DropdownComponent;
