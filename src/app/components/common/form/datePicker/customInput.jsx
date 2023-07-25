import PropTypes from "prop-types";
import { forwardRef } from "react";
import { MdOutlineDateRange } from "react-icons/md";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div className="flex items-center cursor-pointer" onClick={onClick}>
    <MdOutlineDateRange className="mx-1" size={20} />
    <span className="select-none">{value}</span>
  </div>
));

CustomInput.displayName = CustomInput;

CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default CustomInput;
