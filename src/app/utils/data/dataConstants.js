// Calculator
const OPERATORS = ["/", "(", "*", ")", "-"];
// prettier-ignore
const NUMPAD = [
  "7", "8", "9", "4",
  "5", "6", "1", "2",
  "3", "0", "."
];

const MONTHS = [
  { id: 1, name: "Январь" },
  { id: 2, name: "Февраль" },
  { id: 3, name: "Март" },
  { id: 4, name: "Апрель" },
  { id: 5, name: "Май" },
  { id: 6, name: "Июнь" },
  { id: 7, name: "Июль" },
  { id: 8, name: "Август" },
  { id: 9, name: "Сентябрь" },
  { id: 10, name: "Октябрь" },
  { id: 11, name: "Ноябрь" },
  { id: 12, name: "Декабрь" }
];

const dataConstants = {
  MONTHS,
  NUMPAD,
  OPERATORS
};

export default dataConstants;
