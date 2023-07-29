import { Account, Category } from "../../types/userTypes";
import getAmountByType from "./getAmountByType";

interface NewTransact {}

const createNewTransact = ({
  newTransactId,
  amount,
  cardType,
  account,
  category,
  date,
  comment
}: {
  newTransactId: string;
  amount: string;
  cardType: string;
  account: Account;
  category: Category;
  date: Date;
  comment: string | "";
}) => {
  const newTransaction = {
    id: newTransactId,
    amount: getAmountByType(amount, cardType),
    type: cardType,
    account: account.id,
    category: category.id,
    date: date?.toISOString(),
    comment
  };
  return newTransaction;
};

export default createNewTransact;
