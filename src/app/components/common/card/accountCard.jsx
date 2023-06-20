import _ from "lodash";
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  NavDropdown,
  Row
} from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import CardHeader from "./cardHeader";
// import { useState } from "react";

const AccountCard = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleOpen = () => {
  //   setIsOpen((prev) => !prev);
  // };

  const bodyLines = _.times(10);
  const bodyLabels = _.times(3, (i) => `Счет ${16 ** (4 + i)}`);

  return (
    <>
      <CardHeader label={"Счет"} dropdownName={"Основной"} />
      <ListGroup
        className="list-group-flush overflow-auto"
        style={{ maxHeight: "140px" }}
      >
        {bodyLines.map((line) => (
          <ListGroupItem key={line} className="p-0">
            <Row className="mx-auto border">
              {bodyLabels.map((label) => (
                <Col
                  key={label}
                  md="4"
                  className="border p-0 d-flex justify-content-center"
                >
                  <OverlayTooltip text={label} />
                </Col>
              ))}
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default AccountCard;
