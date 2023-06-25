import PropTypes from "prop-types";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import AccountCard from "../common/card/accountCard";
import CardSkeleton from "../common/card/cardSkeleton/cardSkeleton";
import _ from "lodash";

const MainPage = ({ userId }) => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    axios.get(`/api/users`).then((resp) => setUsers(resp.data.users));
  }, [userId]);

  const getNegativeTransactions = (user, accountId) => {
    // Ищем счет по id
    const account = _.find(user.accounts, { id: accountId });

    if (account) {
      // Фильтруем транзакции на счету
      return _.filter(
        user.transactions,
        (t) => t.account === account.id && t.type === "expense" && t.amount < 0
      );
    }

    return [];
  };

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
