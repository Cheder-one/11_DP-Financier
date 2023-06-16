import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CheckboxField = ({ label, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({
      target: {
        name,
        value: target.checked
      }
    });
  };

  return (
    <Form.Group controlId={`form-group-${name}-id`}>
      <Form.Check
        name={name}
        checked={value}
        label={label}
        onChange={handleChange}
        isInvalid={!!error}
        feedback={error}
        feedbackType="invalid"
        className="m-0"
        style={{ fontSize: "15px" }}
      />
    </Form.Group>
  );
};

CheckboxField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default CheckboxField;
