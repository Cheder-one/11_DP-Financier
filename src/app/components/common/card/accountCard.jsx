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

// import PropTypes from "prop-types";
// import CardHeader from "./cardHeader";
// import CardBody from "./cardBody";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const AccountCard = ({ accountCard, categories }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleSelect = (eventKey) => {
//     setSelectedCategory(eventKey);
//   };

//   const filteredItems = accountCard.items.filter(
//     (item) => item.categoryId === selectedCategory || selectedCategory === null
//   );

//   return (
//     <>
//       <CardHeader
//         dropdown={{ label: selectedCategory || "Все", items: categories.map(category => category.name)}}
//         onSelect={handleSelect}
//         {...accountCard}
//       />
//       <CardBody items={filteredItems} />
//     </>
//   );
// };

// AccountCard.propTypes = {
//   accountCard: PropTypes.object.isRequired,
//   categories: PropTypes.array.isRequired
// };

// export default AccountCard;

// const categories = [
//   { id: 1, name: "Категория 1" },
//   { id: 2, name: "Категория 2" }
// ];

// const accounts = [
//   {
//     id: 1,
//     name: "Сбербанк",
//     categoryId: 1
//   },
//   {
//     id: 2,
//     name: "Альфа-банк",
//     categoryId: 1
//   },
//   {
//     id: 3,
//     name: "Тинькофф",
//     categoryId: 2
//   }
// ];

// const incomes = [
//   {
//     id: 1,
//     name: "Зарплата",
//     categoryId: 1
//   },
//   {
//     id: 2,
//     name: "Премия",
//     categoryId: 1
//   },
//   {
//     id: 3,
//     name: "Дивиденды",
//     categoryId: 2
//   }
// ];

// const expenses = [
//   {
//     id: 1,
//     name: "Продукты",
//     categoryId: 1
//   },
//   {
//     id: 2,
//     name: "Одежда",
//     categoryId: 1
//   },
//   {
//     id: 3,
//     name: "Развлечения",
//     categoryId: 2
//   }
// ];
