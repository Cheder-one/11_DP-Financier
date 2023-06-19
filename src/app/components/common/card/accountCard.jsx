import _ from "lodash";
import { Col, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import { useState } from "react";

const AccountCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const bodyLines = _.times(5);
  const bodyLabels = _.times(3, (i) => `Счет ${16 ** (4 + i)}`);

  return (
    <>
      <Row className="mx-auto border">
        <Col md="4" className="border d-flex justify-content-center">
          Счета
        </Col>
        <Col md="4" className="border d-flex justify-content-center">
          <div
            className="user-select-none"
            style={{
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            onClick={handleOpen}
          >
            <OverlayTooltip>Dropdown_sssssss</OverlayTooltip>
          </div>

          <NavDropdown onClick={handleOpen} show={isOpen} drop="down-centered">
            <NavDropdown.Item eventKey="1">Action</NavDropdown.Item>
          </NavDropdown>
        </Col>
        <Col md="4" className="border d-flex justify-content-center">
          Action
        </Col>
      </Row>

      {bodyLines.map((line) => (
        <Row key={line} className="mx-auto border">
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
      ))}

      {/* <CardHeader />
      <Divider />
      <ListGroup
        className="list-group-flush overflow-auto"
        style={{ maxHeight: "132px" }}
      >
        {cardElements.map((el) => (
          <ListGroupItem
            key={el}
            className="d-flex justify-content-between align-items-center"
          >
            <span className="me-2">Sum</span>
            <span className="me-2">Category</span>
            <Button variant="danger" className="btn-sm p-1">
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup> */}
    </>
  );
};

export default AccountCard;
