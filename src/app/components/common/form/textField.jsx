import { Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { eyeFill, eyeSlash } from "../../../assets/show-hide-pass-svg";

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  as,
  md,
  className
}) => {
  const [showPass, setShowPass] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const handleClick = () => {
    setShowPass((prev) => !prev);
  };

  const handleChange = (e) => {
    onChange(e);
  };

  const handleBlur = () => {
    setIsBlur(true);
  };

  return (
    <>
      <Form.Group controlId={name} as={as} md={md} className={className}>
        <Form.Label>{label}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            name={name}
            value={value}
            type={showPass ? "text" : type}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={!error && isBlur}
            isInvalid={!!error && isBlur}
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
  type: "text",
  className: "mb-3"
};

TextField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  as: PropTypes.object,
  md: PropTypes.string,
  className: PropTypes.string
};

export default TextField;
