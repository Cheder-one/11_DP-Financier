import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";

import { eyeFill, eyeSlash } from "../../../assets/btn/show-hide-pass-svg";
import { useBlurOnSubmit } from "../../../hooks";

const TextField = ({
  as,
  containerClass,
  inputClass,
  label,
  type,
  name,
  value,
  error,
  placeholder,
  floating,
  textaria,
  validating,
  isSubmit,
  onChange
}) => {
  const [showPass, setShowPass] = useState(false);
  const [isBlur, setIsBlur] = useBlurOnSubmit(isSubmit);

  const handleClick = () => {
    setShowPass((prev) => !prev);
  };
  const handleChange = (e) => {
    onChange(e);
  };
  const handleBlur = () => {
    setIsBlur(true);
  };

  const isValidField = () => {
    return validating ? !error && isBlur : undefined;
  };
  const isInvalidField = () => {
    return !!error && isBlur;
  };
  const getClass = () => {
    return (textaria ? "h-24 " : "") + inputClass;
  };
  const getFieldType = () => {
    return showPass ? "text" : type;
  };

  return (
    <>
      <Form.Group controlId={name} as={as} className={containerClass}>
        {floating ? "" : <Form.Label>{label}</Form.Label>}
        <InputGroup hasValidation>
          {floating ? (
            <FloatingLabel label={label}>
              <Form.Control
                as={textaria ? "textarea" : undefined}
                className={getClass()}
                name={name}
                value={value}
                placeholder={label}
                type={getFieldType()}
                isValid={isValidField()}
                isInvalid={isInvalidField()}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FloatingLabel>
          ) : (
            <Form.Control
              className={inputClass}
              name={name}
              value={value}
              type={getFieldType()}
              placeholder={placeholder}
              isValid={isValidField()}
              isInvalid={isInvalidField()}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}

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
  containerClass: "mb-3",
  validating: true
};

TextField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  as: PropTypes.object,
  containerClass: PropTypes.string,
  inputClass: PropTypes.string,
  placeholder: PropTypes.string,
  floating: PropTypes.bool,
  textaria: PropTypes.bool,
  validating: PropTypes.bool,
  isSubmit: PropTypes.bool
};

export default TextField;
