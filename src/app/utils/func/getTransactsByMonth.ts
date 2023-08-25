import { Transaction } from "../../types";
import extractUTCDate from "./date/extractUTCDate";

const getTransactsByMonth = (
  transactsByType: Transaction[],
  dateDesiredMonth: Date
) => {
  const extractedDate = extractUTCDate(dateDesiredMonth);

  return transactsByType.filter((transact) => {
    const transactDate = extractUTCDate(transact.date);
    return (
      transactDate.month === extractedDate.month &&
      transactDate.year === extractedDate.year
    );
  });
};

export default getTransactsByMonth;
