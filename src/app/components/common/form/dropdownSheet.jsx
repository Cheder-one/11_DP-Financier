import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { forwardRef, useEffect, useRef } from "react";
import { IconContext } from "react-icons";

const DropdownSheet = ({
  children,
  label,
  value,
  defaultValue,
  containerClass,
  dropListClass,
  squareSize,
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
        onClick={onToggleShow}
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
  dropListClass: PropTypes.string,
  onRef: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggleShow: PropTypes.func.isRequired
};

CustomToggle.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DropdownSheet;
