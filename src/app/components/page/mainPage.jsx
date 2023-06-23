import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import AccountCard from "../common/card/accountCard";
import _ from "lodash";
import axios from "axios";
import { useEffect, useState } from "react";
import CardBody from "../common/card/cardBody";
import CardHeader from "../common/card/cardHeader";
import DatePicker from "react-widgets/DatePicker";

const MainPage = ({ userId }) => {
  const [accounts, setAccounts] = useState(null);
  console.log(accounts);

  useEffect(() => {
    axios.get(`/api/accounts/${userId}`).then((response) => {
      setAccounts(response.data);
      console.log(response.data);
    });

    axios.get(`/api/transactions/user/${userId}`).then((response) => {
      console.log(response.data);
    });
    axios
      .get(`/api/transactions/date/2022-03-02T11:00:00Z`)
      .then((response) => {
        console.log(response.data);
      });
  }, [userId]);

  const humanDate = new Date().toLocaleString();
  console.log(humanDate.split(","));

  const accountCards = [
    { name: "Доходы", dropdown: accounts },
    { name: "Счета", dropdown: accounts },
    { name: "Расходы", dropdown: accounts }
  ];

  return (
    <div className="mx-4">
      <Row className="mt-4">
        {accounts &&
          accountCards.map((card) => (
            <Col md="4" key={card.name} className="my-3">
              <CardHeader cardName={card.name} accounts={accounts} />
              <CardBody />
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
