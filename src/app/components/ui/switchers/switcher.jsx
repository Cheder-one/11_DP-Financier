import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Switcher = ({ label, isChecked }) => {
  return (
    <Form className="d-flex">
      <label className="me-2" htmlFor="theme-switcher">
        {label}
      </label>
      <Form.Check type="switch" id="theme-switcher" checked={isChecked} />
    </Form>
  );
};

Switcher.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool
};

export default Switcher;
