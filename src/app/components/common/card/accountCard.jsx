import CardToolbar from "./cardToolbar";
import CardBody from "./cardBody";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const AccountCard = () => {
  const [users, setUsers] = useState([]);
  useMemo(() => console.log(users), []);

  // Запрашиваем всех пользователей с фейкового сервера при монтировании компонента
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  // Отправляем POST запрос на фейковый сервер для обновления пользователя
  // axios.post("/api/users/1", { name: "John Doe" }).then((response) => {
  //   console.log(response.data);
  // });

  return (
    <>
      <CardToolbar label={"Счет"} dropdownName={"Основной"} />
      <CardBody />
    </>
  );
};

export default AccountCard;
