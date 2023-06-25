import { accounts } from "../accounts/accounts.api";

export const users = [
  {
    id: "user-id-1",
    name: "",
    email: "",
    password: "",
    gender: "",
    avatarUrl: "",
    accounts: accounts["user-id-1"]
  },
  {
    id: "user-id-2",
    name: "Джей Даблди",
    email: "DoubleD@tw.com",
    password: "doubled",
    gender: "male",
    accounts: accounts["user-id-2"]
  },
  {
    id: "user-id-3",
    name: "Иззи Кокс",
    email: "IzzyC@tw.com",
    password: "izzycox",
    gender: "female",
    accounts: accounts["user-id-3"]
  }
];
