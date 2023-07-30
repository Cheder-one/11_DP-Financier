import PropTypes from "prop-types";
import { useRef, useState } from "react";

import { useClickOutside } from "../../../hooks";
import { getTooltipClass } from "../../../utils";

const FormControlFeedback = ({ children, className, isTooltip }) => {
  const [isClickedHide, setIsClickedHide] = useState(false);

  const feedbackRef = useRef();

  // prettier-ignore
  const getFinalClass = () => {
    return isTooltip
      ? className + getTooltipClass()
      : className;
  };

  const clickByError = () => {
    setIsClickedHide(true);
  };

  useClickOutside(feedbackRef, undefined, clickByError);

  return isTooltip && isClickedHide ? null : (
    <div ref={feedbackRef} className={getFinalClass()}>
      <span className="cursor-pointer"> {children}</span>
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
