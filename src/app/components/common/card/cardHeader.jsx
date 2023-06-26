import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Image, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import { toReadableDate } from "../../../utils";

const ALL = "Все";
const PLUS_SQUARE_SRC = "src/app/assets/plus-square-fill.svg";

const CardHeader = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [selectedElemId, setSelectedElemId] = useState({
    account: "",
    income: "",
    expense: ""
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    setDropdown({
      name: ALL,
      items: card.dropdown.map((item) => ({
        id: item.id,
        name: item.name || toReadableDate(item.date)[0]
      }))
    });
  }, [card]);

  const handleDropOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropItemSelect = (eventKeys) => {
    const keys = JSON.parse(eventKeys);
    setDropdown((prev) => ({
      ...prev,
      name: keys.name
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
            onClick={handleDropOpen}
          >
            <OverlayTooltip
              text={<span className="mr-1">{dropdown.name}</span>}
            />
          </div>

          <NavDropdown
            show={isOpen}
            drop="down-centered"
            onClick={handleDropOpen}
            onSelect={handleDropItemSelect}
            className="account-card"
          >
            <NavDropdown.Item eventKey={ALL}>Все</NavDropdown.Item>
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
