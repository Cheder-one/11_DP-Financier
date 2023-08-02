import {
  Button,
  FloatingLabel,
  Form,
  InputGroup
} from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";

import {
  eyeFill,
  eyeSlash
} from "../../../../assets/btn/show-hide-pass-svg";
import { useBlurOnSubmit } from "../../../../hooks";
import FormControlFeedback from "../../tooltip/formControlFeedback";

const TextField = ({
  as,
  containerClass,
  childrenClass,
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
  onChange,
  inputRef
}) => {
  const [showPass, setShowPass] = useState(false);
  const [isBlur, setIsBlur] = useBlurOnSubmit(isSubmit);

  const handleBlur = () => {
    setIsBlur(true);
  };
  const handleClick = () => {
    setShowPass((prev) => !prev);
  };
  const handleChange = (e) => {
    onChange(e);
  };

  const isValidField = () => {
    return validating ? !error && isBlur : undefined;
  };
  const isInvalidField = () => !!error && isBlur;
  const getFieldType = () => (showPass ? "text" : type);
  const getClass = () => (textaria ? "h-24 " : "") + childrenClass;

  return (
    <div className={containerClass}>
      <Form.Group controlId={name} as={as}>
        {!floating && label && <Form.Label>{label}</Form.Label>}
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
                ref={inputRef}
              />
            </FloatingLabel>
          ) : (
            <Form.Control
              className={childrenClass}
              name={name}
              value={value}
              type={getFieldType()}
              placeholder={placeholder}
              isValid={isValidField()}
              isInvalid={isInvalidField()}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={inputRef}
            />
          )}

          {type === "password" && (
            <Button variant="outline-secondary" onClick={handleClick}>
              {showPass ? eyeSlash : eyeFill}
            </Button>
          )}
        </InputGroup>
      </Form.Group>

      {validating && error && isBlur && (
        <FormControlFeedback>{error}</FormControlFeedback>
      )}
    </div>
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
  childrenClass: PropTypes.string,
  placeholder: PropTypes.string,
  floating: PropTypes.bool,
  textaria: PropTypes.bool,
  validating: PropTypes.bool,
  isSubmit: PropTypes.bool,
  inputRef: PropTypes.object
};

export default TextField;
