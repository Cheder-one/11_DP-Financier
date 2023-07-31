import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

import { useBlurOnSubmit } from "../../../../hooks";
import { CustomToggleContainer, CustomToggle } from "../index";
import { InputWithButton } from "../../../ui";
import { checkOnPropRequired, getDynamicBorderClass } from "../../../../utils";
import FormControlFeedback from "../../tooltip/formControlFeedback";

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
  isErrorTooltip,
  touched,
  isAdditionEnabled,
  onElemAdding,
  onSelect,
  error
}) => {
  const [isBlur, setIsBlur] = useBlurOnSubmit(touched);
  const [isOpen, setIsOpen] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [isOpenToAdding, setIsOpenToAdding] = useState(false);

  const handleToggle = (isOpen) => {
    setIsBlur(true);
    setIsOpen(isOpen);
  };

  const handleSelect = (eventKey) => {
    const selectedItem = JSON.parse(eventKey);
    console.log(selectedItem);

    if (selectedItem.id === "newItem") {
      setIsOpenToAdding(true);
    } else {
      onSelect({
        target: {
          name,
          value: selectedItem
        }
      });

      setIsOpenToAdding(false);
      setIsValid(true);
    }
  };

  const handleNewItemSubmit = (event) => {
    const { value } = event.target;

    setIsOpenToAdding(false);

    if (!value) {
      return;
    }
    setIsOpenToAdding(false);
    setIsValid(true);

    onElemAdding(event);
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
    <div className={containerClass + (validating && "relative")}>
      {!isOpenToAdding ? (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}

          <Dropdown
            onSelect={handleSelect}
            onToggle={handleToggle}
            show={isOpen}
          >
            <Dropdown.Toggle as={CustomToggleContainer} variant="light">
              <CustomToggle variant={"light"} borderClass={getBorderClass()}>
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
                  eventKey={JSON.stringify({ id: "newItem" })}
                  className="text-blue-700 text-sm border-top"
                >
                  Добавить
                </Dropdown.Item>
              )}
            </Dropdown.Menu>

            {validating && error && isBlur && (
              <FormControlFeedback isTooltip={isErrorTooltip}>
                {error}
              </FormControlFeedback>
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
    </div>
  );
};

DropdownComponent.defaultProps = {
  containerClass: "w-fit mt-3",
  inputClass: "max-w-[12rem] py-[4px]",
  validating: true,
  isErrorTooltip: true
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
  touched: PropTypes.bool,
  validating: PropTypes.bool,
  isErrorTooltip: PropTypes.bool,
  // Если isAdditionEnabled === true, то onElemAdding required
  onElemAdding: (props, propName, componentName) =>
    checkOnPropRequired(
      props,
      propName,
      props.isAdditionEnabled,
      componentName
    ),
  onSelect: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default DropdownComponent;
