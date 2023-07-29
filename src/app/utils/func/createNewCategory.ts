import { Account, Category } from "../../types/userTypes";

const createNewCategory = ({
  category,
  account,
  newTransactId
}: {
  category: Category;
  account: Account;
  newTransactId: string;
}) => {
  const newCategory = {
    id: category.id,
    type: "category",
    name: category.name,
    accounts: [account.id],
    transactions: [newTransactId]
  };

  return newCategory;
};

export default createNewCategory;
