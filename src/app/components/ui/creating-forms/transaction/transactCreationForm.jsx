import { forwardRef, useState } from "react";

import DropdownSheet from "../../../common/form/dropdown/dropdownSheet";
import Calculator from "../../calculator";
import useClickOutside from "../../../../hooks/useClickOutside";
import { BiSolidCalculator } from "react-icons/bi";

const TransactCreationForm = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemRef, setItemRef] = useState(null);

  // const handleItemSelect = (color) => {
  //   onChange({
  //     target: {
  //       name,
  //       value: color.hex
  //     }
  //   });

  //   setIsOpen(false);
  // };

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
      dropListClass={"p-0 max-h-max"}
      defaultValue={<BiSolidCalculator size={21} />}
      squareSize={"17px"}
      onToggleShow={handleToggleShow}
      onRef={handleRef}
    >
      <Calculator />
    </DropdownSheet>
  );
});

TransactCreationForm.displayName = TransactCreationForm;

export default TransactCreationForm;
