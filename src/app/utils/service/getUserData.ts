import axios from "axios";

const getUserData = async (userId: string) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    const { user } = response.data;
    // saveUserDataToFile(user);
    return user;
  } catch (err) {
    console.error("Ошибка при получении данных о пользователе:", err);
  }
};

const saveUserDataToFile = async (userData) => {
  try {
    const blob = new Blob([JSON.stringify(userData, null, 2)], {
      type: "application/json"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "userData.json";
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

export default getUserData;
