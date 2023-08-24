import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

import { OverlayTooltip } from "../../../common/tooltip";
import { useClickOutside } from "../../../../hooks";
import { getIdAllItem } from "../../../../utils";

/* eslint-disable react-hooks/exhaustive-deps */
const CardDropdown = ({
  items,
  type,
  onSelect,
  onPostSuccess,
  reset
}) => {
  const ALL_ITEM = getIdAllItem(type);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(ALL_ITEM);

  const handleClick = ({ target }) => {
    if (target.id) {
      setSelectedItem(JSON.parse(target.id));
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    onSelect(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    onPostSuccess(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    // Сброс title в dropdown на изначальное, при смене счета.
    if (reset) {
      setSelectedItem(ALL_ITEM);
    }
  }, [reset]);

  const dropdownRef = useRef(null);

  // Слушатель для закрытия dropDownList при клике вне него
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-center w-full px-1 py-0.5 text-black"
        onClick={handleClick}
      >
        <OverlayTooltip text={selectedItem?.name} />
        <VscChevronDown size="" className="pl-0.5" />
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

CardDropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onPostSuccess: PropTypes.func,
  reset: PropTypes.bool
};

export default CardDropdown;
