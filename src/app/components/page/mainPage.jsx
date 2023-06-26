import PropTypes from "prop-types";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import AccountCard from "../common/card/accountCard";
import CardSkeleton from "../common/card/cardSkeleton/cardSkeleton";
import _ from "lodash";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then((resp) => setUser(resp.data.user));
  }, [userId]);

  const { accounts, transactions } = user || {};

  const getUniqTransacts = (type) => {
    if (_.isArray(transactions)) {
      return _.chain(transactions).filter({ type }).uniqBy("date").value();
    }
    return [];
  };

  const cards = [
    {
      name: "Доходы",
      type: "income",
      dropdown: getUniqTransacts("income")
    },
    {
      name: "Счета",
      type: "account",
      dropdown: _.isArray(accounts) ? accounts : []
    },
    {
      name: "Расходы",
      type: "expense",
      dropdown: getUniqTransacts("expense")
    }
  ];

  return (
    <div className="mx-4">
      <Row className="mt-4">
        {user
          ? cards.map((card) => {
              return (
                <Col md="4" key={card.name} className="my-3">
                  <Card>
                    <Card.Body className="p-0">
                      <AccountCard {...{ card }} />
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : cards.map((card) => (
              <Col md="4" key={card.name} className="my-3">
                <CardSkeleton />
              </Col>
            ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <div className="flex justify-center items-center border border-dark vh-40">
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
