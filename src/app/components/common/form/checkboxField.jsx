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
    <Form.Group controlId="form-group-stayOn-id">
      <InputGroup hasValidation>
        <Form.Check
          checked={value}
          className="m-0"
          label={label}
          name={name}
          type="checkbox"
          style={{ fontSize: "15px" }}
          onChange={handleChange}
          isInvalid={!!error}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </InputGroup>
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
