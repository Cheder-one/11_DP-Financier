import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const CustomToggle = ({ children, borderClass }) => {
  return (
    <Button
      variant="light"
      className={
        "items-center rounded cursor-pointer select-none p-1 px-2 inline-flex " +
        borderClass
      }
    >
      {children}
    </Button>
  );
};

export default CustomToggle;
