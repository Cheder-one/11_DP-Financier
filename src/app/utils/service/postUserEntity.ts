import axios from "axios";
import { Entity } from "../../types/userTypes";

const postUserEntity = (userId: string, newEntity: Entity) => {
  try {
    axios.post(`/api/users/${userId}/entities`, newEntity);
  } catch (error) {
    console.error("Ошибка при создании", error);
  }
};

export default postUserEntity;
