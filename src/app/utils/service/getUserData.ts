import axios from "axios";

const getUserData = async (userId: string) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    const { user } = response.data;
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export default getUserData;
