import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Col, Image, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import { xCenter } from "../typography/alignment-classes/centering";

const CardToolbar = ({ label, dropdownName }) => {
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
        <Button variant="black py-0 px-1 m-0">
          <Image
            src="src/app/assets/plus-square-fill.svg"
            style={{
              backgroundColor: "white",
              borderRadius: "0.2rem",
              height: "1.25rem"
            }}
          />
        </Button>
      </Col>
    </Row>
  );
};

CardToolbar.propTypes = {
  label: PropTypes.string.isRequired,
  dropdownName: PropTypes.object.isRequired
};

export default CardToolbar;
