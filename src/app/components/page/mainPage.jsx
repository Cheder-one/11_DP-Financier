import PropTypes from "prop-types";
import axios from "axios";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import CardBody from "../common/card/cardBody";
import CardHeader from "../common/card/cardHeader";
import AccountCard from "../common/card/accountCard";
import _ from "lodash";
import ContentLoader from "react-content-loader";

const MainPage = ({ userId }) => {
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [transactsDay, setTransactsDay] = useState(null);

  useEffect(() => {
    axios.get(`/api/accounts/${userId}`).then((response) => {
      setAccounts(response.data);
    });
    axios.get(`/api/transactions/user/${userId}`).then((response) => {
      setTransactions(response.data);
    });
    axios
      .get(`/api/transactions/date/2022-03-02T11:00:00Z`)
      .then((response) => {
        setTransactsDay(response.data);
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
        {accounts &&
          accountCards.map((card) => (
            <Col md="4" key={card.name} className="my-3">
              <Card>
                <Card.Body className="p-0">
                  <AccountCard card={card} />
                  {/* <ContentLoader
                    speed={2}
                    width="100%"
                    height="10rem"
                    viewBox="0 0 360 170"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect
                      x="5%"
                      y="5%"
                      rx="3"
                      ry="3"
                      width="90%"
                      height="12.5%"
                    />
                    <rect
                      x="5%"
                      y="22.5%"
                      rx="3"
                      ry="3"
                      width="90%"
                      height="72.5%"
                    />
                  </ContentLoader> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <div
            className="d-flex justify-content-center align-items-center border border-dark"
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
