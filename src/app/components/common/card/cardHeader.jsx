import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Image, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";

const ALL = "Все";
const PLUS_SQUARE_SRC = "src/app/assets/plus-square-fill.svg";

/* eslint-disable react/prop-types */

const CardHeader = ({ card, handleSelect, dropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropOpen = () => {
    setIsOpen((prev) => !prev);
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

  return (
    dropdown && (
      <Row className="card-header mx-auto border p-0">
        <Col md="4" className="flex justify-center pt-0.5">
          {card.name}
        </Col>
        <Col
          md="4"
          className="flex justify-center px-1 pt-0.5"
          ref={dropdownRef}
        >
          <div
            className="select-none cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis"
            onClick={handleDropOpen}
          >
            <OverlayTooltip
              text={<span className="mr-1">{dropdown.name}</span>}
            />
          </div>

          <NavDropdown
            show={isOpen}
            drop="down-centered"
            className="account-card"
            onClick={handleDropOpen}
            onSelect={handleSelect}
          >
            <NavDropdown.Item
              eventKey={JSON.stringify({
                id: `all-ids-${card.type}`,
                type: card.type,
                name: ALL
              })}
            >
              {ALL}
            </NavDropdown.Item>
            {dropdown.items.map((item) => (
              <NavDropdown.Item
                key={item.id}
                eventKey={JSON.stringify({ id: item.id, name: item.name })}
              >
                {item.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Col>

        <Col md="4" className="flex justify-center">
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
