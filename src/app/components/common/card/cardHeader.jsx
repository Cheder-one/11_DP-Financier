import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Image, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";

const PLUS_SQUARE_SRC = "src/app/assets/plus-square-fill.svg";

const getDropdownItems = (card) => {
  return card.type === "account"
    ? card.dropdown.map((drop) => drop.name)
    : card.dropdown.map((drop) => {
        const humanDate = new Date(drop.date).toLocaleString();
        return humanDate;
      });
};

const CardHeader = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  useEffect(() => {
    setDropdown({
      label: "Все",
      items: getDropdownItems(card)
    });
  }, [card]);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (eventKey) => {
    setDropdown((prev) => ({
      ...prev,
      label: eventKey
    }));
  };

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
  }, [isOpen]);

  const dropdownRef = useRef(null);

  return (
    dropdown && (
      <Row className="card-header mx-auto border p-0">
        <Col md="4" className="d-flex justify-center pt-0.5">
          {card.name}
        </Col>
        <Col
          md="4"
          className="d-flex justify-center px-1 pt-0.5"
          ref={dropdownRef}
        >
          <div
            style={{
              userSelect: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            onClick={handleOpen}
          >
            <OverlayTooltip
              text={<span className="mr-1">{dropdown.label}</span>}
            />
          </div>

          <NavDropdown
            show={isOpen}
            drop="down-centered"
            onClick={handleOpen}
            onSelect={handleSelect}
            className="account-card"
          >
            <NavDropdown.Item eventKey={"Все"}>Все</NavDropdown.Item>
            {dropdown.items.map((item) => (
              <NavDropdown.Item key={item} eventKey={item}>
                {item}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Col>

        <Col md="4" className="d-flex justify-center">
          <Button
            variant="black px-1"
            style={{
              paddingTop: "0px",
              paddingBottom: "2px"
            }}
          >
            <Image
              src={PLUS_SQUARE_SRC}
              rounded
              style={{
                backgroundColor: "white",
                height: "83%"
              }}
            />
          </Button>
        </Col>
      </Row>
    )
  );
};

CardHeader.propTypes = {
  card: PropTypes.object.isRequired
};

export default CardHeader;
