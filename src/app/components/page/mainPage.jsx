import PropTypes from "prop-types";
import axios from "axios";
import { chain, isArray } from "lodash";
import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import AccountCard from "../common/card/accountCard";
import Loader from "../ui/spinner";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`/api/users/${userId}`);
        setUser(resp.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  const { accounts, categories, transactions } = user || {};

  const getUniqTransactDates = (type) => {
    if (isArray(transactions)) {
      return chain(transactions).filter({ type }).uniqBy("date").value();
    }
    return [];
  };

  const cards = [
    {
      name: "Доход",
      type: "income",
      dropdown: getUniqTransactDates("income")
    },
    {
      name: "Счет",
      type: "account",
      dropdown: isArray(accounts) ? accounts : []
    },
    {
      name: "Расход",
      type: "expense",
      dropdown: getUniqTransactDates("expense")
    }
  ];

  return (
    <>
      {user ? (
        <div className="mx-4">
          <Row className="mt-4">
            {cards.map((card) => (
              <Col md="4" key={card.name} className="my-3">
                <Card>
                  <Card.Body className="p-0">
                    <AccountCard
                      {...{ card, categories }}
                      allTransacts={transactions}
                    />
                  </Card.Body>
                </Card>
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
