import { useEffect, useRef, useState } from "react";

const DROP_ARROW = (
  <svg
    className="w-4 h-4 ml-2"
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

const Dropdown = () => {
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
        className="flex items-center justify-center w-full py-2 text-black px-2"
        onClick={toggleDropdown}
      >
        Dropdown {DROP_ARROW}
      </button>
      {isOpen && (
        <div
          className="dropdown-menu show bg-white rounded-md shadow-lg cursor-pointer absolute left-1/2 transform -translate-x-1/2 z-10 w-44 py-2 mt-2"
          onClick={toggleDropdown}
        >
          <a
            id="Option 1"
            className="block px-4 py-1.5 text-gray-800 hover:bg-gray-200 no-underline"
          >
            Option 1
          </a>
          <div className="dropdown-divider border-t border-gray-300"></div>
          <a
            id="Option 2"
            className="block px-4 py-1.5 text-gray-800 hover:bg-gray-200 no-underline"
          >
            Option 2
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
