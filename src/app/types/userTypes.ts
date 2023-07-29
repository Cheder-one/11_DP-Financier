export interface Account {
  id: string;
  type: "account";
  name: string;
  public: boolean;
  category: string;
  balance: number;
  transactions: string[];
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
}
