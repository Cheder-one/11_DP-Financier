import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import AccountCard from "../common/card/accountCard";
// import { accountGroups } from "../../api/fake.api/archive/accounts/groups.api";
// import { useState } from "react";
import _ from "lodash";
// import { xCenter } from "../common/typography/alignment-classes/centering";

const MainPage = ({ userId }) => {
  return (
    <div className="mx-4">
      <Row className="mt-4">
        {_.times(3).map((card) => (
          <Col md="4" key={card} className="my-3">
            <AccountCard />
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
