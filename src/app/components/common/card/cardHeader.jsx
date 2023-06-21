import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Image, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import { xCenter } from "../typography/alignment-classes/centering";

const PLUS_SQUARE_SRC = "src/app/assets/plus-square-fill.svg";

const CardHeader = ({ label, dropdown, onSelect }) => {
  // const [dropdown, setDropdown] = useState(dropDown);
  // const [dropItems, setDropItems] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // const handleSelect = (eventKey) => {
  //   setDropdown((prev) => ({
  //     ...prev,
  //     label: eventKey
  //   }));
  // };

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
    <Row className="card-header mx-auto border">
      <Col md="4" className={`${xCenter} border`}>
        {label}
      </Col>
      <Col md="4" className={`${xCenter} border p-0`} ref={dropdownRef}>
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
          <OverlayTooltip
            text={<span className="me-1">{dropdown.label}</span>}
          />
        </div>

        <NavDropdown
          show={isOpen}
          drop="down-centered"
          onClick={handleOpen}
          onSelect={onSelect}
        >
          <NavDropdown.Item eventKey={"Все"}>Все</NavDropdown.Item>
          <NavDropdown.Divider className="m-0" />

          {dropdown.items.map((item) => (
            <NavDropdown.Item key={item} eventKey={item}>
              {item}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Col>

      <Col md="4" className={`${xCenter} border`}>
        <Button variant="black py-0 px-1">
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

CardHeader.propTypes = {
  label: PropTypes.string.isRequired,
  dropdown: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CardHeader;
