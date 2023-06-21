import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import AccountCard from "../common/card/accountCard";
import { accountGroups } from "../../api/fake.api/accounts/groups.api";
import { useState } from "react";
import _ from "lodash";

const MainPage = ({ userId }) => {
  const dropItems = _.times(5, (i) => `Элемент ${i}`);

  const [cardList, setCardList] = useState([
    { id: 1, label: "Доход", dropLabel: "Дата", dropItems },
    { id: 2, label: "Счета", dropLabel: "Группа", dropItems },
    { id: 3, label: "Расход", dropLabel: "Дата", dropItems }
  ]);

  const dropList = accountGroups[userId];
  console.log(dropList);

  return (
    <div className="mx-4">
      <Row className="mt-4">
        {cardList.map((card) => (
          <Col md="4" key={card.id} className="my-3">
            <AccountCard {...{ card }} />
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
