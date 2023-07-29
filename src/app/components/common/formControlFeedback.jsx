import PropTypes from "prop-types";
import { useRef, useState } from "react";

import { useClickOutside } from "../../hooks";
import { getTooltipClass } from "../../utils";

const FormControlFeedback = ({ children, className, isTooltip }) => {
  const [isHideError, setIsHideError] = useState(false);

  const feedbackRef = useRef();

  // prettier-ignore
  const getFinalClass = () => {
    return (
      (isTooltip
        ? getTooltipClass() + className
        : className) +
          " cursor-default"
    );
  };

  const clickByError = () => {
    setIsHideError(true);
  };

  useClickOutside(feedbackRef, undefined, clickByError);

  return isTooltip && isHideError ? null : (
    <div ref={feedbackRef} className={getFinalClass()}>
      {children}
    </div>
  );
};

FormControlFeedback.defaultProps = {
  className: "text-sm text-danger pt-1"
};

FormControlFeedback.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  isTooltip: PropTypes.bool
};

export default FormControlFeedback;
