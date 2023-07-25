import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { useClickOutside } from "../../../../../hooks";
import CustomToggle from "./customToggle";
import IconProvider from "./iconProvider";

const DropdownSheet = forwardRef(
  (
    {
      children,
      label,
      value,
      defaultValue,
      containerClass,
      childrenClass,
      iconClass,
      squareSize,
      drop
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const itemRef = useRef();

    const handleToggleShow = () => {
      setIsOpen((prev) => !prev);
    };

    useClickOutside(itemRef, () => setIsOpen(false));

    useImperativeHandle(ref, () => ({
      toggleShow: handleToggleShow
    }));

    return (
      <Dropdown
        className={containerClass}
        autoClose="true"
        show={isOpen}
        ref={itemRef}
        drop={drop}
      >
        {label ? <label className="pb-2">{label}</label> : ""}
        <Dropdown.Toggle
          as={CustomToggle}
          variant="light"
          className="border"
          onClick={handleToggleShow}
        >
          <IconProvider
            iconClass={iconClass}
            squareSize={squareSize}
            value={value}
            defaultValue={defaultValue}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className={childrenClass}>{children}</Dropdown.Menu>
      </Dropdown>
    );
  }
);

DropdownSheet.displayName = "CustomToggle";

DropdownSheet.defaultProps = {
  squareSize: "20px",
  containerClass: "dropdown-sheet w-fit",
  childrenClass: "p-0",
  iconClass: "flex justify-center cursor-pointer border rounded w-fit p-1"
};

DropdownSheet.propTypes = {
  children: PropTypes.node.isRequired,
  drop: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  squareSize: PropTypes.string,
  defaultValue: PropTypes.any,
  containerClass: PropTypes.string,
  childrenClass: PropTypes.string,
  iconClass: PropTypes.string
};

export default DropdownSheet;