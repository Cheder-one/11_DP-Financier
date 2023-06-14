import { Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { eyeFill, eyeSlash } from "../../../assets/show-hide-pass-svg";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            // className={getInputClasses()}
            type={showPass ? "text" : type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
          />
          {type === "password" && (
            <Button variant="outline-secondary">
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
