import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import AccountCard from "../common/card/accountCard";
import { accountGroups } from "../../api/fake.api/accounts/groups.api";

const MainPage = ({ userId }) => {
  const cardList = ["Счета", "Доходы", "Расходы"];
  const dropList = accountGroups[userId];
  console.log(dropList);

  dropList.forEach((accGroup) => {
    const { groupName, accountIds } = accGroup;
    console.log(accGroup);
    console.log(groupName);
    console.log(accountIds);
  });

  return (
    <div className="mx-4">
      <Row className="mt-4">
        {cardList.map((label) => (
          <Col md="4" key={label} className="my-3">
            <AccountCard label={label} accountGroups={"dropList"} />
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
