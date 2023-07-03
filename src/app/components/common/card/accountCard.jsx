import { useEffect, useMemo, useRef } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import Dropdown from "../form/dropdown";
import { filter, keys, uniqBy } from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AccountCard = ({ md, title, route, type, bodyList, bodyCeil }) => {
  return (
    <Card className="p-0">
      <Card.Body className="p-0">
        <Row className="card-header mx-auto border p-0">
          <Col
            as={route ? Link : "div"}
            to={route}
            md={md[0]}
            className="flex justify-center items-center text-decoration-none text-inherit"
          >
            {title.first}
          </Col>
          <Col md={md[1]} className="mx-auto p-0">
            {title.second}
          </Col>
          <Col md={md[2]} className="flex justify-center items-center">
            {title.third}
          </Col>
        </Row>

        <ListGroup className="list-group-flush overflow-auto border-gray-400 vh-25 me-0">
          <ListGroupItem className="p-0">
            {keys(bodyList).map((item) => {
              item = bodyList[item];
              return (
                <Row key={item.id} className="mx-auto">
                  <Col
                    md={md[0]}
                    className="flex justify-center items-center border px-0 py-0.5"
                  >
                    {item.amount || bodyCeil?.first}
                  </Col>
                  <Col
                    md={md[1]}
                    className="flex justify-center items-center border px-0 py-0.5"
                  >
                    {item.category || bodyCeil?.second}
                  </Col>
                  <Col
                    md={md[2]}
                    className="flex justify-center items-center border px-0 py-0.5"
                  >
                    {item.name || bodyCeil?.third}
                  </Col>
                </Row>
              );
            })}
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

AccountCard.defaultProps = {
  md: [4, 6, 2]
};

export default AccountCard;
