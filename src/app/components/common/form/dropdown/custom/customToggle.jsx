import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const CustomToggle = ({ children, variant, borderClass }) => {
  return (
    <Button
      variant={variant}
      className={
        "items-center rounded cursor-pointer select-none p-1 px-2 inline-flex " +
        borderClass
      }
    >
      {children}
    </Button>
  );
};

CustomToggle.defaultProps = {
  variant: "light"
};

CustomToggle.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  borderClass: PropTypes.string
};

export default CustomToggle;
