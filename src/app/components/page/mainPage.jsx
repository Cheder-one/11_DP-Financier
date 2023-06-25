import PropTypes from "prop-types";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import AccountCard from "../common/card/accountCard";
import CardSkeleton from "../common/card/cardSkeleton/cardSkeleton";
import _ from "lodash";

const MainPage = ({ userId }) => {
  const [users, setUsers] = useState([]);
  // const user = users.find((u) => u.id === userId);
  // const categoryIdsFirstAcc = user.accounts[0].categoryIds;
  // console.log(user.categories);

  const user = users[userId];
  console.log(user);

  const userAccounts = user?.accounts;
  console.log(userAccounts);

  // Найти счет по name "Сбербанк"
  const sberAccount = _.find(userAccounts, { name: "Сбербанк" });
  console.log(sberAccount);

  // Найти в счете категорию по name "Аренда"
  const accCategoryIds = sberAccount.categoryIds;
  console.log(accCategoryIds);

  const accCategories = user.categories;
  console.log(accCategories);

  const accountWithRent = _.find(accCategories, { name: "Аренда" });
  console.log(accountWithRent);

  // Найти в счете транзакцию по id

  useEffect(() => {
    axios.get(`/api/users`).then((resp) => setUsers(resp.data.users[0]));

    // axios.get(`/api/users/${userId}`).then((resp) => console.log(resp.data));
  }, [userId]);

  // const cards = [
  //   {
  //     name: "Доходы",
  //     type: "income",
  //     dropdown: transactions?.filter((transact) => transact.type === "income")
  //   },
  //   { name: "Счета", type: "account", dropdown: accounts },
  //   {
  //     name: "Расходы",
  //     type: "expense",
  //     dropdown: transactions?.filter((transact) => transact.type === "expense")
  //   }
  // ];

  return (
    <div className="mx-4">
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <Row className="mt-4">
        {false
          ? [].map((card) => (
              <Col md="4" key={card.name} className="my-3">
                <Card>
                  <Card.Body className="p-0">
                    <AccountCard card={card} />
                  </Card.Body>
                </Card>
              </Col>
            ))
          : [{ name: 1 }, { name: 2 }, { name: 3 }].map((card) => (
              <Col md="4" key={card.name} className="my-3">
                <CardSkeleton />
              </Col>
            ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-center items-center border border-dark vh-40">
            <h5>Element</h5>
          </div>
        </Col>
      </Row>
    </div>
  );
};

MainPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MainPage;
