import { filter } from "lodash";
import { IncomeExpense, User } from "../../../types";

export const getAccountTransacts = (user: User, id: string) =>
  filter(user.transactions, { account: id });

export const getTransactByAccount = (
  data: IncomeExpense,
  id: string
) => filter(data.transacts, { account: id });

export const getTransactsByDate = (
  data: IncomeExpense,
  date: string
) => filter(data.transacts, { date });
