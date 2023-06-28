import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Image, NavDropdown, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import { toReadableDate } from "../../../utils";

const ALL = "Все";
const PLUS_SQUARE_SRC = "src/app/assets/plus-square-fill.svg";

/* eslint-disable react/prop-types */

const CardHeader = ({ card, handleSelect, dropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const transformDropdown = {
    ...dropdown,
    items: dropdown?.items.map((item) => {
      const isTransaction = item.id.includes("transaction");
      const name = isTransaction ? toReadableDate(item.name)[0] : item.name;
      const date = isTransaction ? item.name : null;
      return { ...item, name, date };
    })
  };

  console.log(transformDropdown);

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
        <Col md="4" className="flex justify-center items-center pt-0.5">
          {card.name}
        </Col>
        <Col
          md="6"
          className="flex justify-center items-center px-1 pt-0.5"
          ref={dropdownRef}
        >
          <div
            className="select-none cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis"
            onClick={handleDropOpen}
          >
            <OverlayTooltip
              text={<span className="mr-1">{transformDropdown.name}</span>}
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
            {transformDropdown.items.map((item) => (
              <NavDropdown.Item
                key={item.id}
                eventKey={JSON.stringify({ ...item })}
              >
                {item.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Col>

        <Col md="2" className="flex justify-center items-center">
          <Button
            variant="black px-1"
            style={{
              paddingTop: "0px",
              paddingBottom: "2px"
            }}
          >
            <Image
              src={PLUS_SQUARE_SRC}
              className="cursor-pointer select-none"
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
