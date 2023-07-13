const Dropdown = () => {
  const items = [
    { id: 1, name: "Наличные" },
    { id: 2, name: "Дебетовая карта" },
    { id: 3, name: "Депозит" },
    { id: 4, name: "Интернет деньги" },
    { id: 5, name: "Криптовалюта" },
    { id: 6, name: "Инвестиции" },
    { id: 7, name: "Имущество" },
    { id: 8, name: "Кредит" },
    { id: 9, name: "Долг" }
  ];

  return (
    <div className="relative inline-block">
      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        {items.map(({ id, name }) => (
          <option key={id}>{name}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12.586l4-4V8h-8v.586l4 4zm0 4l-4-4V12H8v.586l4 4zm0-8L6 8H4v2h2l4 4 4-4h2V8h-2l-4 4z" />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
