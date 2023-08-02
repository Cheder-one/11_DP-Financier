import PropTypes from "prop-types";
import { find } from "lodash";
import { useMemo, useRef } from "react";
import { FaQuestionCircle } from "react-icons/fa";

import { IconTable } from "../../../ui/index.js";
import { iconsArray } from "../../../../assets/icons/iconsImport.jsx";
import DropdownSheet from "../dropdown/drop-sheet/dropdownSheet.jsx";

const IconPicker = ({ name, value, color, className, drop, onChange }) => {
  const dropdownSheetRef = useRef(null);

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

    dropdownSheetRef?.current.toggleShow();
  };

  return (
    <DropdownSheet
      squareSize={"17px"}
      value={<SelectedIcon color={color} />}
      defaultValue={<FaQuestionCircle color="blue" />}
      containerClass={className}
      childrenClass={"p-0 max-h-max"}
      ref={dropdownSheetRef}
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