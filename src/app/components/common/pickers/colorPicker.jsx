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
        value: color
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
      onToggleShow={handleToggleShow}
      onRef={handleRef}
    >
      <CompactPicker color={value} onChange={handleItemSelect} />
    </DropdownSheet>
  );
};

export default ColorPicker;
