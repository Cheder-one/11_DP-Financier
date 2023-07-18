import { useState } from "react";

import DropdownSheet from "../form/dropdownSheet";
import IconTable from "../../ui/icon-table/iconTable";
import useClickOutside from "../../../hooks/useClickOutside";
import { FaQuestionCircle } from "react-icons/fa";

const IconPicker = ({ className, drop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemRef, setItemRef] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleItemSelect = (icon) => {
    setSelectedIcon(icon);
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
      value={selectedIcon}
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
