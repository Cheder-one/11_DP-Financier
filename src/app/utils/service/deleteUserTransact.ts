import axios from "axios";

const postUserTransact = (userId: string, transactionId: string) => {
  console.log(userId);
  console.log(transactionId);
  try {
    axios.delete(
      `/api/users/${userId}/transactions/${transactionId}`
    );
  } catch (error) {
    console.error("Ошибка при удалении", error);
  }
};

export default postUserTransact;
