import React, { useState } from "react";

import DropdownSheet from "../form/dropdownSheet";
import IconTable from "../../ui/icon-table/iconTable";
import useClickOutside from "../../../hooks/useClickOutside";
import { FaQuestionCircle } from "react-icons/fa";
import { find } from "lodash";
import { iconsArray } from "../../../assets/icons/iconsImport";

const IconPicker = ({ name, value, color, className, drop, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemRef, setItemRef] = useState(null);

  // console.log(value);
  // const SelectedIcon = value;
  console.log(value);
  console.log(iconsArray[0].name);
  // const SelectedIcon = find(iconsArray, { name: value });
  // console.log(SelectedIcon);

  const foundIcon = find(iconsArray, { name: value });
  console.log(foundIcon);

  const SelectedIcon = foundIcon;

  const IconWithColor = () => {
    // const color = "blue";
    return <SelectedIcon color={color} />;
  };

  const handleItemSelect = (Icon) => {
    onChange({
      target: {
        name,
        value: Icon.name
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

  // useClickOutside(itemRef, () => setIsOpen(false));
  console.log(<FaQuestionCircle color="blue" />);

  return (
    <DropdownSheet
      isOpen={isOpen}
      value={<IconWithColor />}
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
