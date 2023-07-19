import PropTypes from "prop-types";
import { useState } from "react";
import { CompactPicker } from "react-color";

import DropdownSheet from "../form/dropdownSheet";
import useClickOutside from "../../../hooks/useClickOutside";
import { MdOutlineFormatColorFill } from "react-icons/md";

const ColorPicker = ({ name, value, className, drop, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemRef, setItemRef] = useState(null);

  const handleItemSelect = (color) => {
    onChange({
      target: {
        name,
        value: color.hex
      }
    });

    setIsOpen(false);
  };

  const handleToggleShow = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRef = (ref) => {
    setItemRef(ref);
  };

  useClickOutside(itemRef, () => setIsOpen(false));

  return (
    <DropdownSheet
      isOpen={isOpen}
      defaultValue={<MdOutlineFormatColorFill />}
      drop={drop}
      className={className}
      squareSize={"17px"}
      onToggleShow={handleToggleShow}
      onRef={handleRef}
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
