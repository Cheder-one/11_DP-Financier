import React, { useState, useRef, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { IconContext } from "react-icons";
import { Button } from "react-bootstrap";

import iconsArray from "./iconsImport";

const IconPicker = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const iconPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        iconPickerRef.current &&
        !iconPickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShow = () => {
    setIsOpen((prev) => !prev);
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    // onSelect(icon);
    setIsOpen(false);
  };

  return (
    <div className="icon-picker" ref={iconPickerRef}>
      <Button variant="" className="border p-1" onClick={handleShow}>
        {selectedIcon ? (
          <div className="selected-icon">
            <IconContext.Provider value={{ size: "20px" }}>
              {selectedIcon}
            </IconContext.Provider>
          </div>
        ) : (
          <div className="p-2.5"></div>
        )}
      </Button>
      {isOpen && (
        <Table striped bordered hover>
          <tbody>
            {iconsArray
              .reduce((rows, Icon, index) => {
                if (index % 5 === 0) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(
                  <td key={index} onClick={() => handleIconSelect(Icon)}>
                    <div className="flex justify-center cursor-pointer">
                      <Icon />
                    </div>
                  </td>
                );
                return rows;
              }, [])
              .map((row, index) => (
                <tr key={index}>{row}</tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default IconPicker;
