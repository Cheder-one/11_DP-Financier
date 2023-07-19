import PropTypes from "prop-types";
import { find } from "lodash";
import { useMemo, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

import DropdownSheet from "../form/dropdownSheet";
import IconTable from "../../ui/icon-table/iconTable";
import useClickOutside from "../../../hooks/useClickOutside";
import { iconsArray } from "../../../assets/icons/iconsImport";

const IconPicker = ({ name, value, color, className, drop, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemRef, setItemRef] = useState(null);

  const SelectedIcon = useMemo(
    () => find(iconsArray, { name: value }),
    [value]
  );

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

  useClickOutside(itemRef, () => setIsOpen(false));

  return (
    <DropdownSheet
      isOpen={isOpen}
      value={<SelectedIcon color={color} />}
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

IconPicker.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  drop: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default IconPicker;
