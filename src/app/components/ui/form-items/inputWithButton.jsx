import { useRef } from "react";
import PropTypes from "prop-types";
import { Button, Form, InputGroup } from "react-bootstrap";

import { useEventListener, useFocus } from "../../../hooks";

const InputWithButton = ({
  name,
  value,
  placeholder,
  containerClass,
  inputClass,
  buttonClass,
  onChange,
  onSubmit
}) => {
  const inputRef = useRef();
  const addBtnRef = useRef();

  const handleChange = (event) => {
    onChange(event);
  };

  const handleSubmit = () => {
    onSubmit({
      target: { name, value }
    });
  };

  const handleKeyPress = ({ keyCode }) => {
    if (keyCode === 13) {
      addBtnRef.current.click();
    }
  };

  useEventListener("keydown", handleKeyPress);
  useFocus(inputRef);

  return (
    <InputGroup className={containerClass}>
      <Form.Control
        name={name}
        value={value}
        className={inputClass}
        placeholder={placeholder}
        onChange={handleChange}
        ref={inputRef}
      />
      <Button className={buttonClass} ref={addBtnRef} onClick={handleSubmit}>
        +
      </Button>
    </InputGroup>
  );
};

InputWithButton.defaultProps = {
  containerClass: "m-0",
  inputClass: "py-[4px]",
  buttonClass:
    "py-[3px] border-2 bg-white text-black transition-transform transform duration-200 hover:border-green-600 hover:outline-none hover:ring-opacity-50 hover:scale-100 active:scale-95"
};

InputWithButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  containerClass: PropTypes.string,
  inputClass: PropTypes.string,
  buttonClass: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default InputWithButton;
