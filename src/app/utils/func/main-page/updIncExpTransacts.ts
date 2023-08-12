import { filter } from "lodash";
import { Transaction } from "../../../types";
import { Dispatch, SetStateAction } from "react";

// =======Types=======
interface UniqDate extends Transaction {
  name: string;
}
interface IncomeExpense {
  transacts: Transaction[];
  uniqDates: UniqDate[];
}
interface TransactsByType {
  income: IncomeExpense;
  expense: IncomeExpense;
}
type SetCardItemsType = Dispatch<
  SetStateAction<{ income: Transaction[]; expense: Transaction[] }>
>;

// =======Main=======
const updIncExpTransacts = (
  accId: string,
  transactsByType: TransactsByType,
  setCardItems: SetCardItemsType
) => {
  const { income, expense } = transactsByType;

  const incomeFiltered = filter(income.transacts, {
    account: accId
  });
  const expenseFiltered = filter(expense.transacts, {
    account: accId
  });

  setCardItems((prev) => ({
    ...prev,
    income: incomeFiltered,
    expense: expenseFiltered
  }));
};

export default updIncExpTransacts;
