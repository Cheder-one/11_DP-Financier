import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { forwardRef, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";

import useClickOutside from "../../../hooks/useClickOutside";

const DropdownSheet = ({
  children,
  label,
  value,
  defaultValue,
  className,
  drop,
  onRef,
  isOpen,
  onToggleShow
}) => {
  const itemRef = useRef();

  useEffect(() => {
    onRef(itemRef);
  }, [onRef, itemRef]);

  return (
    <Dropdown
      className={className}
      autoClose="true"
      show={isOpen}
      ref={itemRef}
      drop={drop}
    >
      <label className="pb-2">{label}</label>
      <Dropdown.Toggle
        as={CustomToggle}
        variant="light"
        className="border"
        onClick={onToggleShow}
      >
        <div className="flex justify-center cursor-pointer border rounded w-10 p-2">
          <IconContext.Provider value={{ size: "20px" }}>
            {value || defaultValue}
          </IconContext.Provider>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-0">{children}</Dropdown.Menu>
    </Dropdown>
  );
};

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

CustomToggle.displayName = "CustomToggle";

DropdownSheet.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  onRef: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggleShow: PropTypes.func.isRequired
};

CustomToggle.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DropdownSheet;
