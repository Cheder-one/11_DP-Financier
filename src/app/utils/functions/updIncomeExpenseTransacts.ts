// @ts-ignore
import { filter } from "lodash";

interface Transactions {
  account: string;
  // Другие свойства транзакции
}
interface IncomeExpense {
  transacts: Transactions[];
}
interface CardBodyItems {
  income: IncomeExpense;
  expense: IncomeExpense;
}

const filterTransactsByAccount = (
  transacts: Transactions[],
  accountId: string
): Transactions[] => {
  return filter(transacts, { account: accountId });
};

const updIncomeExpenseTransacts = (
  id: string,
  income: IncomeExpense,
  expense: IncomeExpense,
  setCardBodyItems
) => {
  const incomeFiltered = filterTransactsByAccount(income.transacts, id);
  const expenseFiltered = filterTransactsByAccount(expense.transacts, id);

  setCardBodyItems((prev) => ({
    ...prev,
    income: incomeFiltered,
    expense: expenseFiltered
  }));
};

export default updIncomeExpenseTransacts;
