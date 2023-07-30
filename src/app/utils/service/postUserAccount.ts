import axios from "axios";
import { Account } from "../../types/userTypes";

const postUserAccount = (userId: string, newAccount: Account) => {
  try {
    axios.post(`/api/users/${userId}/accounts`, newAccount);
  } catch (error) {
    console.error("Ошибка при создании", error);
  }
};

export default postUserAccount;
