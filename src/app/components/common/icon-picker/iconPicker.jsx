import PropTypes from "prop-types";
import { Dropdown, Table } from "react-bootstrap";
import { forwardRef, useRef, useState } from "react";
import { IconContext } from "react-icons";

import iconsArray from "./icons/iconsImport";
import EmptyIcon from "./icons/emptyIcon";
import useClickOutside from "../../../hooks/useClickOutside";

const DropdownTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const itemRef = useRef();

  const handleItemSelect = (Icon) => {
    setSelectedIcon(Icon);
    setIsOpen(false);
  };

  const handleToggleShow = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(itemRef, () => setIsOpen(false));

  return (
    <Dropdown autoClose="true" show={isOpen}>
      <Dropdown.Toggle
        as={CustomToggle}
        variant="light"
        className="border"
        onClick={handleToggleShow}
      >
        <div
          className="cursor-pointer p-2 border rounded inline-block"
          ref={itemRef}
        >
          <IconContext.Provider
            value={{
              size: "20px",
              color: "black",
              className: "cursor-pointer"
            }}
          >
            {selectedIcon || <EmptyIcon />}
          </IconContext.Provider>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-0">
        <div>
          <Table bordered className="m-0">
            <tbody>
              {iconsArray(5).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((Icon, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="hover:bg-lime-200"
                      onClick={() => handleItemSelect(Icon)}
                      // ref={itemRef}
                    >
                      <IconContext.Provider
                        value={{
                          size: "20px",
                          color: "black",
                          className: "cursor-pointer"
                        }}
                      >
                        <Icon />
                      </IconContext.Provider>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

CustomToggle.displayName = "CustomToggle";

CustomToggle.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DropdownTable;
