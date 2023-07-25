import PropTypes from "prop-types";
import { forwardRef } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import TextField from "../input-field/textField";

const CustomInput = forwardRef(({ value, onClick, children }, ref) => (
  <div className="flex items-center cursor-pointer" onClick={onClick}>
    <MdOutlineDateRange className="mx-1" size={20} />
    {children || <span className="select-none">{value}</span>}
  </div>
));

CustomInput.displayName = CustomInput;

CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default CustomInput;
