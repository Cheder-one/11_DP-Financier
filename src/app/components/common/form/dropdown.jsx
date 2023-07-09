import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import OverlayTooltip from "../typography/overlayTooltip";

const getIdAllItem = (type) => {
  return {
    id: "all-" + (type ? `${type}-ids` : "ids"),
    type,
    name: "Все"
  };
};

const Dropdown = ({ items, type, onSelect, reset }) => {
  const ALL_ITEM = getIdAllItem(type);
  const isInitialRender = useRef(true);
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

  // Слушатель для закрытия dropDownList при клике вне него
  const dropdownRef = useRef(null);

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
        <OverlayTooltip text={selectedItem?.name || selectedItem} />
        <RiArrowDropDownLine size="20px" />
      </button>
      {isOpen && (
        <div
          className="dropdown-menu show bg-white rounded-md shadow-lg cursor-pointer absolute left-1/2 transform -translate-x-1/2 z-10 w-44 py-1 mt-1"
          onClick={handleClick}
        >
          <a
            id={JSON.stringify(ALL_ITEM)}
            className="block px-4 py-1.5 text-black hover:bg-gray-200 no-underline border-b border-gray-300"
          >
            Все
          </a>
          {items.map((item) => (
            <a
              id={JSON.stringify(item)}
              key={item.id}
              className="block px-4 py-1.5 text-black hover:bg-gray-200 no-underline"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  // .isRequired,
  type: PropTypes.string
};

export default Dropdown;
