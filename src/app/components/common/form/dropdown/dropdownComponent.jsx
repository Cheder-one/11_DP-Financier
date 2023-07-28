import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

import { useBlurOnSubmit } from "../../../../hooks";
import { CustomToggleContainer, CustomToggle } from "../index";
import { InputWithButton } from "../../../ui";
import { getDynamicBorderClass } from "../../../../utils";

const DropdownComponent = ({
  label,
  name,
  value,
  items,
  placeholder,
  defaultValue,
  containerClass,
  inputContainerClass,
  inputClass,
  validating,
  isSubmit,
  isAdditionEnabled,
  onElemAdding,
  onChange,
  error
}) => {
  const [isBlur, setIsBlur] = useBlurOnSubmit(isSubmit);
  const [isOpen, setIsOpen] = useState(null);
  const [isValid, setIsValid] = useState(null);
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

  const handleNewItemSubmit = (target) => {
    setIsOpenToAdding(false);
    handleToggle(false);
    setIsValid(true);

    onElemAdding(target);
  };

  useEffect(() => {
    if (!value) {
      setIsValid(false);
    }
  }, [value]);

  const getBorderClass = () => {
    return validating
      ? getDynamicBorderClass(isBlur, isOpen, isValid)
      : "border-gray-light";
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
            <Dropdown.Toggle as={CustomToggleContainer} variant="light">
              <CustomToggle borderClass={getBorderClass()} variant={"light"}>
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
          containerClass={inputContainerClass}
          inputClass={inputClass}
          placeholder={placeholder}
          onSubmit={handleNewItemSubmit}
        />
      )}
    </>
  );
};

DropdownComponent.defaultProps = {
  containerClass: "w-fit mt-3",
  validating: true
};

DropdownComponent.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  items: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  containerClass: PropTypes.string,
  inputContainerClass: PropTypes.string,
  inputClass: PropTypes.string,
  isAdditionEnabled: PropTypes.bool,
  onElemAdding: PropTypes.func,
  isSubmit: PropTypes.bool,
  validating: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default DropdownComponent;
