import { useState } from "react";
import { CompactPicker } from "react-color";

import DropdownSheet from "../form/dropdownSheet";
import useClickOutside from "../../../hooks/useClickOutside";
import { MdOutlineFormatColorFill } from "react-icons/md";

const ColorPicker = ({ className, drop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemRef, setItemRef] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  const handleItemSelect = (color) => {
    setSelectedColor(color.hex);
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
      <CompactPicker color={selectedColor} onChange={handleItemSelect} />
    </DropdownSheet>
  );
};

export default ColorPicker;
