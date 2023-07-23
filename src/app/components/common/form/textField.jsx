import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { eyeFill, eyeSlash } from "../../../assets/btn/show-hide-pass-svg";

const TextField = ({
  as,
  className,
  floating,
  textaria,
  label,
  type,
  name,
  value,
  error,
  isSubmit,
  onChange
}) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
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

  useEffect(() => {
    if (!isInitialRender) {
      setIsBlur(true);
    } else {
      setIsInitialRender(false);
    }
  }, [isSubmit]);

  return (
    <>
      <Form.Group controlId={name} as={as} className={className}>
        {floating ? "" : <Form.Label>{label}</Form.Label>}
        <InputGroup hasValidation>
          {floating ? (
            <FloatingLabel label={label}>
              <Form.Control
                as={textaria ? "textarea" : undefined}
                style={textaria ? { height: "100px" } : undefined}
                name={name}
                value={value}
                placeholder={label}
                type={showPass ? "text" : type}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={!error && isBlur}
                isInvalid={!!error && isBlur}
              />
            </FloatingLabel>
          ) : (
            <Form.Control
              name={name}
              value={value}
              type={showPass ? "text" : type}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={!error && isBlur}
              isInvalid={!!error && isBlur}
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
  className: PropTypes.string,
  floating: PropTypes.bool,
  textaria: PropTypes.bool
};

export default TextField;
