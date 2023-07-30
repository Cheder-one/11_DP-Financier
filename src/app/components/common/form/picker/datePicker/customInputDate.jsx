import PropTypes from "prop-types";
import { forwardRef } from "react";
import { MdOutlineDateRange } from "react-icons/md";

const CustomInputDate = forwardRef(({ value, onClick }, ref) => {
  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={onClick}
    >
      <MdOutlineDateRange className="mx-1" size={20} />
      <button className="select-none">{value}</button>
    </div>
  );
});

CustomInputDate.displayName = CustomInputDate;

CustomInputDate.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default CustomInputDate;
