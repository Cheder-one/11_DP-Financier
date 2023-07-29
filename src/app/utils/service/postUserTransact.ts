import axios from "axios";
import { Transaction } from "../../types/userTypes";

const postUserTransact = (userId: string, newTransaction: Transaction) => {
  try {
    axios.post(`/api/users/${userId}/transactions`, newTransaction);
  } catch (error) {
    console.error("Ошибка при создании", error);
  }
};

export default postUserTransact;
