import PropTypes from "prop-types";
import { Form, InputGroup } from "react-bootstrap";

const CheckboxField = ({ label, name, value, onChange, error }) => {
  console.log(error);
  const handleChange = ({ target }) => {
    onChange({
      target: {
        name,
        value: target.checked
      }
    });
  };

  return (
    <Form.Group
      className="position-relative"
      controlId={`form-group-${name}-id`}
    >
      <Form.Check
        name={name}
        label={label}
        onChange={handleChange}
        isInvalid={!!error}
        feedback={error}
        feedbackType="invalid"
        feedbackTooltip
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
