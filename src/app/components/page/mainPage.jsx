import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import AccountCard from "../common/card/accountCard";
import { accountGroups } from "../../api/fake.api/accounts/groups.api";
import { useState } from "react";
import _ from "lodash";

const MainPage = ({ userId }) => {
  const dropItems = _.times(5, (i) => `Элемент ${i}`);
  const [accountCardList, setAccountCardList] = useState([
    {
      name: "income",
      label: "Доход",
      dropDown: { label: "Дата", items: dropItems }
    },
    {
      name: "accounts",
      label: "Счета",
      dropDown: { label: "Группа", items: dropItems }
    },
    {
      name: "expenses",
      label: "Расход",
      dropDown: { label: "Дата", items: dropItems }
    }
  ]);

  const dropList = accountGroups[userId];
  console.log(dropList);

  const columns = {
    name: { path: "name", name: "Имя" },
    quality: {
      name: "Качества",
      component: (user) => <Qualities {...user} />
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => onDeleteUser(user._id)}
        >
          Delete
        </button>
      )
    }
  };

  return (
    <div className="mx-4">
      <Row className="mt-4">
        {accountCardList.map((card) => (
          <Col md="4" key={card.name} className="my-3">
            <AccountCard accountCard={card} />
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
