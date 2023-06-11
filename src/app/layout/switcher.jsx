import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Switcher = ({ label, onClick }) => {
  return (
    <Form onClick={onClick}>
      <Form.Check type="switch" label={label} />
    </Form>
  );
};

Switcher.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default Switcher;
