import { Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { eyeFill, eyeSlash } from "../../../assets/show-hide-pass-svg";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPass, setShowPass] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const handleClick = () => {
    setShowPass((prev) => !prev);
  };

  const handleBlur = () => {
    console.log("Input field blurred");
  };

  return (
    <>
      <Form.Group className="mb-2 ">
        <label htmlFor={name}>{label}</label>
        <InputGroup hasValidation>
          <Form.Control
            id={name}
            name={name}
            value={value}
            type={showPass ? "text" : type}
            onChange={onChange}
            onBlur={handleBlur}
            isValid={!error}
            isInvalid={!!error}
          />
          {type === "password" && (
            <Button variant="outline-secondary" onClick={handleClick}>
              {showPass ? eyeSlash : eyeFill}
            </Button>
          )}
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </>
  );
};

TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
