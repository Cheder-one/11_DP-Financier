import PropTypes from "prop-types";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useRef, useState } from "react";

import { updateInputFields } from "../../../utils";
import { useFocus } from "../../../hooks";

const InputWithButton = ({
  name,
  placeholder,
  containerClass,
  inputClass,
  buttonClass,
  onChange,
  onSubmit
}) => {
  const [inputField, setInputField] = useState({
    [name]: ""
  });

  const inputRef = useRef();
  const addBtnRef = useRef();

  useFocus(inputRef);

  const handleChange = ({ target }) => {
    updateInputFields(target, setInputField);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      target: {
        name,
        value: inputField[name]
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className={containerClass}>
        <Form.Control
          name={name}
          value={inputField[name]}
          className={inputClass}
          placeholder={placeholder}
          onChange={handleChange}
          ref={inputRef}
        />
        <Button type="submit" className={buttonClass} ref={addBtnRef}>
          +
        </Button>
      </InputGroup>
    </Form>
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
  placeholder: PropTypes.string,
  containerClass: PropTypes.string,
  inputClass: PropTypes.string,
  buttonClass: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default InputWithButton;
