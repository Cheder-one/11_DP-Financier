import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import OverlayTooltip from "../typography/overlayTooltip";

const DROP_ARROW = (
  <svg
    className="w-3 h-3 ml-0.5"
    fill="black"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    ></path>
  </svg>
);

const Dropdown = ({ title, children, items }) => {
  console.log(items);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(ALL_ITEM);

  const handleClick = ({ target }) => {
    const { id: eventKey } = target;
    if (eventKey) {
      setSelectedItem(JSON.parse(eventKey));
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    // Вызов onSelect только после первого рендера
    if (!isInitialRender.current) {
      onSelect(selectedItem);
    } else {
      isInitialRender.current = false;
    }
  }, [selectedItem]);

  useEffect(() => {
    // Сброс title в dropdown на изначальное, при смене счета.
    if (reset) {
      setSelectedItem(ALL_ITEM);
    }
  }, [reset]);

  const dropdownRef = useRef(null);

  // Слушатель для закрытия dropDownList при клике вне него
  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (!dropdownRef?.current?.contains(target)) {
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
        onClick={handleClick}
      >
        {title || children} {DROP_ARROW}
      </button>
      {isOpen && (
        <div
          className="dropdown-menu show bg-white rounded-md shadow-lg cursor-pointer absolute left-1/2 transform -translate-x-1/2 z-10 w-44 py-1 mt-1"
          onClick={toggleDropdown}
        >
          <a
            id="all-ids"
            className="block px-4 py-1 text-black hover:bg-gray-300 no-underline border-b"
          >
            Все
          </a>
          {items.map((item) => (
            <a
              key={item.id}
              id="Option 2"
              className="block px-4 py-1 mt-1 text-black hover:bg-gray-200 no-underline border-gray-300"
            >
              {item.name || item.date}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  reset: PropTypes.bool
};

export default Dropdown;
