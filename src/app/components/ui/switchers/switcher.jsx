import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Switcher = ({ label, onClick }) => {
  return (
    <Form className="d-flex" onClick={onClick}>
      <label className="me-2" htmlFor="theme-switcher">
        {label}
      </label>
      <Form.Check type="switch" id="theme-switcher" />
    </Form>
  );
};

Switcher.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default Switcher;
