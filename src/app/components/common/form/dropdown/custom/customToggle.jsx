import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const CustomToggle = ({ children, borderClass }) => {
  return (
    <Button
      variant="light"
      className={
        "flex items-center rounded cursor-pointer select-none p-1 px-2 w-fit " +
        borderClass
      }
    >
      {children}
    </Button>
  );
};

export default CustomToggle;
