import React from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import Dropdown from "../form/dropdown";

type Props = {
  md: number[];
};

const AccountCard = ({ md }: Props) => {
  md = [4, 6, 2];
  return (
    <Card className="p-0">
      <Card.Body className="p-0">
        <Row className="card-header mx-auto border p-0">
          <Col md={md[0]} className="flex justify-center items-center">
            {"Card"}
          </Col>
          <Col md={md[1]} className="flex justify-center items-center">
            {/* {"Dropdown"} */}
            <Dropdown />
          </Col>
          <Col md={md[2]} className="flex justify-center items-center">
            {"+"}
          </Col>
        </Row>

        <ListGroup className="list-group-flush overflow-auto border-gray-400 vh-25 me-0">
          <ListGroupItem className="p-0">
            <Row className="mx-auto">
              <Col
                className="flex justify-center items-center border px-0 py-0.5"
                md={md[0]}
              >
                1
              </Col>
              <Col
                className="flex justify-center items-center border px-0 py-0.5"
                md={md[1]}
              >
                2
              </Col>
              <Col
                className="flex justify-center items-center border px-0 py-0.5"
                md={md[2]}
              >
                3
              </Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
              <Col md={md[0]}>1</Col>
              <Col md={md[1]}>2</Col>
              <Col md={md[2]}>3</Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default AccountCard;
