import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CheckboxField = ({ name, value, onChange, error, children }) => {
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
        label={children}
        name={name}
        checked={value}
        onChange={handleChange}
        isInvalid={!!error}
        feedback={error}
        feedbackType="invalid"
        className="m-0"
      />
    </Form.Group>
  );
};

CheckboxField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CheckboxField;
