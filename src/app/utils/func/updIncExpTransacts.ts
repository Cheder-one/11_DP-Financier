import { filter } from "lodash";

// =======Types=======
interface Transaction {
  id: string;
  amount: string;
  type: "income" | "expense";
  account: string;
  category: string;
  date: string;
  comment: string;
}

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

// =======Util=======
const filterTransactsByAccount = (
  accId: string,
  transacts: Transaction[]
): Transaction[] => {
  return filter(transacts, { account: accId });
};

// =======Main=======
const updIncExpTransacts = (
  accId: string,
  transactsByType: TransactsByType,
  setCardItems
) => {
  const { income, expense } = transactsByType;

  const incomeFiltered = filterTransactsByAccount(
    accId,
    income.transacts
  );
  const expenseFiltered = filterTransactsByAccount(
    accId,
    expense.transacts
  );

  setCardItems((prev) => ({
    ...prev,
    income: incomeFiltered,
    expense: expenseFiltered
  }));
};

export default updIncExpTransacts;
