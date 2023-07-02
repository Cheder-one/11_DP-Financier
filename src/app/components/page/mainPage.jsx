import PropTypes from "prop-types";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { chain, isArray, keys } from "lodash";
import { useEffect, useMemo, useState } from "react";
import Loader from "../ui/spinner";
import AccountCard from "../common/card/accountCard";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const { accounts, categories, transactions } = user;

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const getUniqTransactDates = (type) =>
    chain(transactions || [])
      .filter({ type })
      .uniqBy("date")
      .value();

  const cards = [
    {
      title: "Доход",
      type: "income",
      dropdown: getUniqTransactDates("income")
    },
    {
      title: "Счет",
      type: "account",
      dropdown: isArray(accounts) ? accounts : []
    },
    {
      title: "Расход",
      type: "expense",
      dropdown: getUniqTransactDates("expense")
    }
  ];

  return (
    <>
      {keys(user).length > 0 ? (
        <div className="mx-4">
          <Row className="mt-4">
            {cards.map((card) => (
              <Col key={card.title} md="4">
                <AccountCard
                  title={card.title}
                  type={card.type}
                  {...{ transactions }}
                />
              </Col>
            ))}

            {/* <Col md="4">
              <AccountCard
                title="Счета"
                type="account"
                dropItems={accounts}
                bodyItems={transactions}
              />
            </Col>
            <Col md="4">
              <AccountCard
                title="Расход"
                type="expense"
                dropItems={expense.uniqDates}
                bodyItems={expense.transacts}
              />
            </Col> */}
          </Row>

          <Row className="mt-4">
            <Col>
              <div className="flex justify-center items-center border border-dark vh-40">
                <h5>Element</h5>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Loader className="flex justify-center items-center vh-30" />
      )}
    </>
  );
};
MainPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MainPage;
