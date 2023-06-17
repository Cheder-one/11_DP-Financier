import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CheckboxField = ({
  name,
  value,
  onChange,
  error,
  children,
  className
}) => {
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
        className={className}
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
  ]),
  className: PropTypes.string
};

export default CheckboxField;
