import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { IconContext } from "react-icons";

import useClickOutside from "../../../../hooks/useClickOutside";
import CustomToggle from "./customToggle";

const DropdownSheet = forwardRef(
  (
    {
      children,
      label,
      value,
      defaultValue,
      containerClass,
      dropListClass,
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
          <div className="flex justify-center cursor-pointer border rounded w-fit p-1 relative z-0">
            <IconContext.Provider value={{ size: squareSize }}>
              {value || defaultValue}
            </IconContext.Provider>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className={dropListClass}>{children}</Dropdown.Menu>
      </Dropdown>
    );
  }
);

DropdownSheet.displayName = "CustomToggle";

DropdownSheet.defaultProps = {
  squareSize: "20px",
  className: "dropdown-sheet",
  dropListClass: "p-0"
};

DropdownSheet.propTypes = {
  children: PropTypes.node.isRequired,
  drop: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  squareSize: PropTypes.string,
  defaultValue: PropTypes.any,
  containerClass: PropTypes.string,
  dropListClass: PropTypes.string
};

export default DropdownSheet;
