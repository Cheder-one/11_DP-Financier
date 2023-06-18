import _ from "lodash";
import { Col, Row } from "react-bootstrap";
import AccountCard from "../common/card/accountCard";

const MainPage = () => {
  const cardList = _.times(3);

  return (
    <div className="mx-4">
      <Row className="mt-5">
        {cardList.map((el) => (
          <Col md="4" key={el}>
            <div style={{ height: "190px", border: " solid 1px black" }}>
              <AccountCard />
            </div>
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

export default MainPage;
