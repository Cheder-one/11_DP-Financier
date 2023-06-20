import { useState } from "react";
import { Button, Col, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import { xCenter } from "../typography/alignment-classes/centering";

const CardHeader = ({ label, dropdownName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Row className="mx-auto border">
      <Col md="4" className={`${xCenter} border`}>
        {label}
      </Col>
      <Col md="4" className={`${xCenter} border`}>
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
          <OverlayTooltip text={dropdownName} />
        </div>

        <NavDropdown onClick={handleOpen} show={isOpen} drop="down-centered">
          <NavDropdown.Item eventKey="1">Action</NavDropdown.Item>
        </NavDropdown>
      </Col>
      <Col md="4" className={`${xCenter} border`}>
        <Button
          className="fs-6"
          variant="outline-success btn-md"
          style={{ padding: "0 0.5rem", margin: "2px" }}
        >
          +
        </Button>
      </Col>
    </Row>
  );
};

export default CardHeader;
