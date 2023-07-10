import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CheckboxField = ({
  as,
  name,
  value,
  onChange,
  error,
  children,
  className,
  style
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
        as={as}
        label={<div style={{ ...style }}>{children}</div>}
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

CheckboxField.defaultProps = {
  style: { fontSize: "15px" }
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
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  style: PropTypes.object
};

export default CheckboxField;
