// Calculator
const OPERATORS = ["/", "(", "*", ")", "-"];
// prettier-ignore
const NUMPAD = [
  "7", "8", "9", "4",
  "5", "6", "1", "2",
  "3", "0", "."
];

// Dropdown Creating Account
const ENTITIES = [
  { id: 1, name: "Наличные" },
  { id: 2, name: "Интернет деньги" },
  { id: 3, name: "Дебетовая карта" },
  { id: 4, name: "Кредитная карта" },
  { id: 5, name: "Депозит" },
  { id: 6, name: "Криптовалюта" },
  { id: 7, name: "Инвестиции" },
  { id: 8, name: "Имущество" },
  { id: 9, name: "Кредит" },
  { id: 10, name: "Долг" }
];
const CURRENCIES = [
  { id: 1, name: "Российский Рубль (RUB)", code: "RUB" },
  { id: 2, name: "Доллар США (USD)", code: "USD" },
  { id: 3, name: "Евро (EUR)", code: "EUR" },
  { id: 4, name: "Британский Фунт (GBP)", code: "GBP" },
  { id: 5, name: "Японская Йена (JPY)", code: "JPY" },
  { id: 6, name: "Швейцарский Франк (CHF)", code: "CHF" },
  { id: 7, name: "Канадский Доллар (CAD)", code: "CAD" },
  { id: 8, name: "Австралийский Доллар (AUD)", code: "AUD" },
  { id: 9, name: "Китайский Юань (CNY)", code: "CNY" },
  { id: 10, name: "Индийская Рупия (INR)", code: "INR" }
];

const INIT_USER_DATA = {
  id: "",
  name: "",
  email: "",
  password: "",
  gender: "",
  avatarUrl: "",
  accounts: [],
  categories: [],
  transactions: [],
  entities: [],
  currencies: []
};

const dataConstants = {
  ENTITIES,
  CURRENCIES,
  NUMPAD,
  OPERATORS,
  INIT_USER_DATA
};

export default dataConstants;
