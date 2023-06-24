import PropTypes from "prop-types";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import AccountCard from "../common/card/accountCard";
import CardSkeleton from "../common/card/cardSkeleton/cardSkeleton";
import {
  xCenter,
  yCenter
} from "../common/typography/alignment-classes/centering";

const MainPage = ({ userId }) => {
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [transactsDay, setTransactsDay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .all([
        axios.get(`/api/accounts/${userId}`),
        axios.get(`/api/transactions/user/${userId}`),
        axios.get(`/api/transactions/date/2022-03-02T11:00:00Z`)
      ])
      .then(
        axios.spread(
          (accountsResponse, transactionsResponse, transactsDayResponse) => {
            setAccounts(accountsResponse.data);
            setTransactions(transactionsResponse.data);
            setTransactsDay(transactsDayResponse.data);
          }
        )
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, [userId]);

  const accountCards = [
    { type: "income", name: "Доходы", dropdown: transactions },
    { type: "account", name: "Счета", dropdown: accounts },
    { type: "expend", name: "Расходы", dropdown: transactions }
  ];

  return (
    <div className="mx-4">
      <Row className="mt-4">
        {isLoading
          ? accountCards.map((card) => (
              <Col md="4" key={card.name} className="my-3">
                <Card>
                  <Card.Body className="p-0">
                    <AccountCard card={card} />
                  </Card.Body>
                </Card>
              </Col>
            ))
          : accountCards.map((card) => (
              <Col md="4" key={card.name} className="my-3">
                <CardSkeleton />
              </Col>
            ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <div
            className={`d-flex ${xCenter} ${yCenter} border border-dark`}
            style={{ height: "230px" }}
          >
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
