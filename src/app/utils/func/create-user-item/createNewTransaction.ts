import { Account, Category } from "../../../types/userTypes";
import getAmountByType from "../getAmountByType";

const createNewTransact = ({
  amount,
  account,
  category,
  date,
  comment,
  cardType,
  newTransactId
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