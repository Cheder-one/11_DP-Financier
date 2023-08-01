import { Account, Category } from "../../../types/userTypes";

const createNewCategory = ({
  category,
  account,
  newCategoryId,
  newTransactId
}: {
  category: Category;
  account: Account;
  newCategoryId: string;
  newTransactId: string;
}) => {
  const newCategory = {
    id: newCategoryId,
    type: "category",
    name: category.name.trim(),
    accounts: [account.id],
    transactions: [newTransactId]
  };

  return newCategory;
};

export default createNewCategory;
