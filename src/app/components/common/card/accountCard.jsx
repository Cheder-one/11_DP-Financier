// import PropTypes from "prop-types";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
// import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AccountCard = ({ accountCard }) => {
  // const [dropdown, setDropdown] = useState("accountCard.dropDown");
  // const [dropItems, setDropItems] = useState(null);

  // const handleSelect = (eventKey) => {
  //   setDropdown((prev) => ({
  //     ...prev,
  //     label: eventKey
  //   }));
  // };

  return (
    <>
      <CardHeader />
      <CardBody />
    </>
  );
};

AccountCard.propTypes = {
  // accountCard: PropTypes.object.isRequired
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
