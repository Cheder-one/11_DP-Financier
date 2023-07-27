import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

import { getBorderStyle } from "../../../../utils";
import { useBlurOnSubmit } from "../../../../hooks";
import { CustomToggleContainer, CustomToggle } from "../index";
import InputWithButton from "../../../ui/form-items/inputWithButton";

const DropdownComponent = ({
  label,
  name,
  value,
  items,
  placeholder,
  defaultValue,
  containerClass,
  isAdditionEnabled,
  onElemAdding,
  isSubmit,
  onChange,
  error
}) => {
  const [isBlur, setIsBlur] = useBlurOnSubmit(isSubmit);
  const [isOpen, setIsOpen] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [isOpenToAdding, setIsOpenToAdding] = useState(false);

  const handleToggle = (isOpen) => {
    setIsBlur(true);
    setIsOpen(isOpen);
  };

  const handleSelect = (eventKey) => {
    const selectedItem = JSON.parse(eventKey);

    if (selectedItem.id === "__addNew__") {
      setIsOpenToAdding(true);
    } else {
      onChange({
        target: {
          name,
          value: selectedItem
        }
      });
      setIsOpenToAdding(false);
      setIsValid(true);
    }
  };

  const handleAddItem = (target) => {
    handleToggle(false);
    setIsOpenToAdding(false);

    onElemAdding(target);
  };

  useEffect(() => {
    if (isBlur && !isOpen && !value) {
      setIsValid(false);
    }
  }, [isOpen, isBlur, value]);

  const borderClass = getBorderStyle(isBlur, isOpen, isValid);
  console.log({ isBlur, isOpen, isValid });

  const getIsDropdownValid = () => {
    return isValid ? borderClass : borderClass + " is-invalid";
  };

  return (
    <>
      {!isOpenToAdding ? (
        <Form.Group className={containerClass}>
          {label && <Form.Label>{label}</Form.Label>}

          <Dropdown
            onSelect={handleSelect}
            onToggle={handleToggle}
            show={isOpen}
          >
            <Dropdown.Toggle
              variant="light"
              as={CustomToggleContainer}
              className={getIsDropdownValid()}
            >
              <CustomToggle borderClass={borderClass} variant={"light"}>
                {value || defaultValue}
                <VscChevronDown className="pl-0.5" />
              </CustomToggle>
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
      ) : (
        <InputWithButton
          name={name}
          containerClass={"m-0"}
          placeholder={placeholder}
          onSubmit={handleAddItem}
        />
      )}
    </>
  );
};

DropdownComponent.defaultProps = {
  containerClass: "w-fit mt-3"
};

DropdownComponent.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  items: PropTypes.array.isRequired,
  containerClass: PropTypes.string,
  isAdditionEnabled: PropTypes.bool,
  isSubmit: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default DropdownComponent;
