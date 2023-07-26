import PropTypes from "prop-types";
import { forwardRef } from "react";

const CustomToggleContainer = forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </button>
));

CustomToggleContainer.displayName = "CustomToggleContainer";

CustomToggleContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CustomToggleContainer;
