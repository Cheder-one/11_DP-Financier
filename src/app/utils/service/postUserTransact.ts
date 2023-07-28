import axios from "axios";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  account: string;
  category: string;
  date: string;
  comment: string;
}

const postUserTransact = (userId: string, newTransaction: Transaction) => {
  try {
    axios.post(`/api/users/${userId}/transactions`, newTransaction);
  } catch (error) {
    console.error("Ошибка при создании", error);
  }
};

export default postUserTransact;
