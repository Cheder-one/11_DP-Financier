import { Account, Category } from "../../../../types";

const createNewCategory = ({
  category,
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
    transactions: [newTransactId]
  };

  return newCategory;
};

export default createNewCategory;
