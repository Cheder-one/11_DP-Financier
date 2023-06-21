import PropTypes from "prop-types";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
import axios from "axios";
import { useEffect, useState } from "react";

const AccountCard = ({ accountCard }) => {
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

  const [dropdown, setDropdown] = useState(accountCard.dropDown);
  const [dropItems, setDropItems] = useState(null);

  const handleSelect = (eventKey) => {
    setDropdown((prev) => ({
      ...prev,
      label: eventKey
    }));
  };

  return (
    <>
      <CardHeader
        dropdown={dropdown}
        onSelect={handleSelect}
        {...accountCard}
      />
      <CardBody />
    </>
  );
};

AccountCard.propTypes = {
  accountCard: PropTypes.object.isRequired
  // dropDown: PropTypes.object.isRequired
};

export default AccountCard;
