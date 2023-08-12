import { includes } from "lodash";

const checkIsIncomeExpense = (type: string) => {
  return includes(["income", "expense"], type);
};

export default checkIsIncomeExpense;
