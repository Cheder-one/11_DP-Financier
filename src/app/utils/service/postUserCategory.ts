import axios from "axios";

interface Category {
  id: string;
  type: string;
  name: string;
  accounts: string[];
  transactions: string[];
}

const postUserCategory = (userId: string, newCategory: Category) => {
  try {
    axios.post(`/api/users/${userId}/categories`, newCategory);
  } catch (error) {
    console.error("Ошибка при создании", error);
  }
};

export default postUserCategory;
