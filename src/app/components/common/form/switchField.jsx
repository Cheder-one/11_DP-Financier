import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const SwitchForm = ({ label, darkTheme }) => {
  console.log(darkTheme);

  const handleChange = (e) => {};

  return (
    <Form className="flex">
      <label className="me-2" htmlFor="theme-switcher">
        {label}
      </label>
      <Form.Check
        className="m-0"
        type="switch"
        id="theme-switcher"
        checked={darkTheme}
        onChange={handleChange}
      />
    </Form>
  );
};

SwitchForm.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  darkTheme: PropTypes.bool
};

export default SwitchForm;
