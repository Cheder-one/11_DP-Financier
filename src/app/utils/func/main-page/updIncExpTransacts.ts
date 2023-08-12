import { filter } from "lodash";
import { Transaction, TransactsByType } from "../../../types";
import { Dispatch, SetStateAction } from "react";

// =======Types=======
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
