import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Image, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import { xCenter } from "../typography/alignment-classes/centering";

const PLUS_SQUARE_SRC = "src/app/assets/plus-square-fill.svg";

const CardToolbar = ({ label, dropdownLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <OverlayTooltip text={dropdownLabel} />
        </div>

        <NavDropdown
          ref={dropdownRef}
          onClick={handleOpen}
          show={isOpen}
          drop="down-centered"
        >
          <NavDropdown.Item eventKey="1">Action1</NavDropdown.Item>
          <NavDropdown.Item eventKey="2">Action2</NavDropdown.Item>
        </NavDropdown>
      </Col>
      <Col md="4" className={`${xCenter} border`}>
        <Button variant="black py-0 px-1 m-0">
          <Image
            src={PLUS_SQUARE_SRC}
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
  label: PropTypes.string.isRequired
  // dropdownLabel: PropTypes.object.isRequired
};

export default CardToolbar;
