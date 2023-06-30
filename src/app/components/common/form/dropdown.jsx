import { useEffect, useRef, useState } from "react";

const DROP_ARROW = (
  <svg
    className="w-4 h-4 ml-0.5"
    fill="none"
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

const Dropdown = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (event) => {
    setIsOpen((prev) => !prev);

    console.log(event.target.id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
        className="flex items-center justify-center w-full py-1 text-black"
        onClick={toggleDropdown}
      >
        {name} {DROP_ARROW}
      </button>
      {isOpen && (
        <div
          className="dropdown-menu show bg-white rounded-md shadow-lg cursor-pointer absolute left-1/2 transform -translate-x-1/2 z-10 w-44 py-1.5 mt-1"
          onClick={toggleDropdown}
        >
          <a
            id="all-ids"
            className="block px-4 py-1.5 text-black hover:bg-gray-200 no-underline "
          >
            Все
          </a>
          <a
            id="Option 2"
            className="block px-4 py-1.5 mt-1.5 text-black hover:bg-gray-200 no-underline border-t border-gray-300"
          >
            Option 2
          </a>
          <a
            id="Option 2"
            className="block px-4 py-1.5 text-black hover:bg-gray-200 no-underline"
          >
            Option 2
          </a>
          <a
            id="Option 2"
            className="block px-4 py-1.5 text-black hover:bg-gray-200 no-underline"
          >
            Option 2
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
