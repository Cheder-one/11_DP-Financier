// import accounts from "./accounts.api";

// export const accounts = [
//   { id: 1, name: "Сбербанк", balance: 90000 },
//   { id: 2, name: "Альфа-банк", balance: 80000 },
//   { id: 3, name: "ВТБ", balance: 5000 },
//   { id: 4, name: "Яндекс.Деньги", balance: 20000 },
//   { id: 5, name: "WebMoney", balance: 15000 },
//   { id: 6, name: "QIWI", balance: 10000 },
//   { id: 7, name: "Тинькофф Инвестиции", balance: 600000 },
//   { id: 8, name: "Сбербанк Инвестиции", balance: 500000 },
//   { id: 9, name: "Альфа-Капитал", balance: 70000 }
// ];

const accountGroups = [
  {
    groupName: "Основное",
    accountIds: [1, 7]
  },
  {
    groupName: "Банковские счета",
    accountIds: [1, 2, 3]
  },
  {
    groupName: "Электронные кошельки",
    accountIds: [4, 5, 6]
  },
  {
    groupName: "Инвестирование",
    accountIds: [7, 8, 9]
  }
];

const incomes = [
  { id: 1, account: 1, amount: 5000, category: "Зарплата" },
  { id: 2, account: 2, amount: 2000, category: "Аренда" },
  { id: 3, account: 4, amount: 1000, category: "Продажа акций" },
  { id: 4, account: 1, amount: 3000, category: "Подработка" },
  { id: 5, account: 1, amount: 4000, category: "Премия" },
  { id: 6, account: 7, amount: 1500, category: "Дивиденды" },
  { id: 7, account: 2, amount: 2500, category: "Подарок" },
  { id: 8, account: 1, amount: 1800, category: "Бонус" },
  { id: 9, account: 3, amount: 2200, category: "Кэшбэк" },
  { id: 10, account: 5, amount: 3500, category: "Сдача квартиры" }
];

const expenses = [
  { id: 1, account: 1, amount: 1000, category: "Продукты" },
  { id: 2, account: 2, amount: 500, category: "Транспорт" },
  { id: 3, account: 2, amount: 2000, category: "Аренда" },
  { id: 4, account: 3, amount: 700, category: "Коммунальные услуги" },
  { id: 5, account: 2, amount: 1500, category: "Развлечения" },
  { id: 6, account: 1, amount: 800, category: "Одежда" },
  { id: 7, account: 4, amount: 250, category: "Подарки" },
  { id: 8, account: 2, amount: 1000, category: "Кафе" },
  { id: 9, account: 5, amount: 300, category: "Кино" },
  { id: 10, account: 3, amount: 1200, category: "Техника" }
];

export default {
  accountGroups,
  incomes,
  expenses
};

// function getAccountsByIds(ids) {
//   return accounts.filter((account) => ids.includes(account.id));
// }
// console.log(getAccountsByIds([7, 8, 9]));
