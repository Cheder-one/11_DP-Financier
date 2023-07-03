import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import OverlayTooltip from "../typography/overlayTooltip";

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = ({ target }) => {
    const { id } = target;
    if (id) {
      const itemData = JSON.parse(id);
      console.log(itemData);
    }

    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-center w-full px-1 py-0.5 text-black"
        onClick={toggleDropdown}
      >
        <OverlayTooltip text={title} />
        <RiArrowDropDownLine size="20px" />
      </button>
      {isOpen && (
        <div
          className="dropdown-menu show bg-white rounded-md shadow-lg cursor-pointer absolute left-1/2 transform -translate-x-1/2 z-10 w-44 py-1 mt-1"
          onClick={toggleDropdown}
        >
          <a
            id={'"all-ids"'}
            className="block px-4 py-1 text-black hover:bg-gray-200 no-underline border-b border-gray-300"
          >
            Все
          </a>
          {items.map((item) => (
            <a
              id={JSON.stringify(item)}
              key={item.id}
              className="block px-4 py-1 mt-1 text-black hover:bg-gray-200 no-underline"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
