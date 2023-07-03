import { useEffect, useRef, useState } from "react";

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
  const dropdownRef = useRef(null);

  const toggleDropdown = (event) => {
    setIsOpen((prev) => !prev);
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

export default Dropdown;
