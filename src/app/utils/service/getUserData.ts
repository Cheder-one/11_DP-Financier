import axios from "axios";

const getUserData = async (userId: string) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    const { user } = response.data;
    return user;
  } catch (err) {
    console.error("Ошибка при получении данных о пользователе:", err);
  }
};

export default getUserData;
