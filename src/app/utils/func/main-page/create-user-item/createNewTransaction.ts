import { Account, Category, Currency } from "../../../../types";
import getAmountByType from "../../getAmountByType";

interface NewTransaction {
  newTransactId: string;
  value: string;
  cardType: string;
  account: Account;
  category: Category;
  currency: Currency;
  date: Date;
  comment: string | "";
}

const createNewTransact = ({
  value,
  account,
  category,
  currency,
  date,
  comment,
  cardType,
  newTransactId
}: NewTransaction) => {
  const newTransaction = {
    id: newTransactId,
    value: getAmountByType(value, cardType),
    type: cardType,
    account: account.id,
    category: category.id,
    currency: currency.id,
    date: date?.toISOString(),
    comment
  };
  return newTransaction;
};

export default createNewTransact;
