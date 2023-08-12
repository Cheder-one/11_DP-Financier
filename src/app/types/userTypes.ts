export interface Icon {
  name: string;
  color: string;
}

export interface Entity {
  id: string;
  name: string;
}

export interface Currency {
  id: string;
  name: string;
  code: string;
}

export interface Account {
  id: string;
  type: "account";
  name: string;
  entity: string;
  currency: string;
  balance: string;
  transactions: string[];
  icon: Icon;
  comment: string;
}

export interface Category {
  id: string;
  type: "category";
  name: string;
  accounts: string[];
  transactions: string[];
}

export interface Transaction {
  id: string;
  amount: string;
  type: "income" | "expense";
  account: string;
  category: string;
  date: string;
  comment: string;
}

export interface UniqDate extends Transaction {
  name: string;
}
export interface IncomeExpense {
  transacts: Transaction[];
  uniqDates: UniqDate[];
}
export interface TransactsByType {
  income: IncomeExpense;
  expense: IncomeExpense;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  avatarUrl: string;
  accounts: Account[];
  categories: Category[];
  transactions: Transaction[];
  entities: Entity[];
  currencies: Currency[];
}
