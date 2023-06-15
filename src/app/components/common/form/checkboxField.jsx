import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CheckboxField = ({ label, name, value, onChange, error }) => {
  return (
    <Form.Check
      className="m-0"
      label={label}
      type="checkbox"
      id="default-checkbox"
      style={{ fontSize: "15px" }}
    />
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
