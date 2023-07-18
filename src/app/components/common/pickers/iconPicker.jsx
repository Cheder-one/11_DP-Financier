import React, { useState } from "react";

import DropdownSheet from "../form/dropdownSheet";
import IconTable from "../../ui/icon-table/iconTable";
import useClickOutside from "../../../hooks/useClickOutside";
import { FaQuestionCircle } from "react-icons/fa";

const IconPicker = ({ name, value, color, className, drop, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemRef, setItemRef] = useState(null);
  // const [selectedIcon, setSelectedIcon] = useState(null);

  const handleItemSelect = (Icon) => {
    // setSelectedIcon(Icon);
    onChange({
      target: {
        name,
        value: Icon
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
      value={value}
      defaultValue={<FaQuestionCircle color="blue" />}
      drop={drop}
      className={className}
      onToggleShow={handleToggleShow}
      onRef={handleRef}
    >
      <IconTable onItemSelect={handleItemSelect} />
    </DropdownSheet>
  );
};

export default IconPicker;
