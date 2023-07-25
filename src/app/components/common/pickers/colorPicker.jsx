import PropTypes from "prop-types";
import { useRef } from "react";
import { CompactPicker } from "react-color";

import { DropdownSheet } from "../form";
import { MdOutlineFormatColorFill } from "react-icons/md";

const ColorPicker = ({ name, value, className, drop, onChange }) => {
  const dropdownSheetRef = useRef(null);

  const handleItemSelect = (color) => {
    onChange({
      target: {
        name,
        value: color.hex
      }
    });

    dropdownSheetRef?.current.toggleShow();
  };

  return (
    <DropdownSheet
      squareSize={"17px"}
      className={className}
      ref={dropdownSheetRef}
      defaultValue={<MdOutlineFormatColorFill />}
    >
      <CompactPicker color={value} onChange={handleItemSelect} />
    </DropdownSheet>
  );
};

ColorPicker.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  drop: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default ColorPicker;
