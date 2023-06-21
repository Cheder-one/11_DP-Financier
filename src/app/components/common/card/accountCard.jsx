import CardToolbar from "./cardToolbar";
import CardBody from "./cardBody";
import axios from "axios";
import { useEffect, useState } from "react";

const AccountCard = ({ card }) => {
  // const [users, setUsers] = useState([]);

  // Запрашиваем всех пользователей с фейкового сервера при монтировании компонента
  // useEffect(() => {
  //   axios.get("/api/users").then((response) => {
  //     setUsers(response.data);
  //   });
  // }, []);

  // Отправляем POST запрос на фейковый сервер для обновления пользователя
  // axios.post("/api/users/1", { name: "John Doe" }).then((response) => {
  //   console.log(response.data);
  // });

  return (
    <>
      <CardToolbar {...card} />
      <CardBody />
    </>
  );
};

export default AccountCard;
