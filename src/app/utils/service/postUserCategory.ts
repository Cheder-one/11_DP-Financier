import axios from "axios";
import { Category } from "../../types/userTypes";

const postUserCategory = (userId: string, newCategory: Category) => {
  try {
    axios.post(`/api/users/${userId}/categories`, newCategory);
  } catch (error) {
    console.error("Ошибка при создании", error);
  }
};

export default postUserCategory;
