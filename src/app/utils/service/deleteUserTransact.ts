import axios from "axios";

const postUserTransact = (userId: string, transactionId: string) => {
  try {
    axios.delete(
      `/api/users/${userId}/transactions/${transactionId}`
    );
  } catch (error) {
    console.error("Ошибка при удалении", error);
  }
};

export default postUserTransact;
