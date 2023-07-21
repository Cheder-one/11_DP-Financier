import PropTypes from "prop-types";
import { keys } from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

import OverlayTooltip from "../typography/overlayTooltip";

const TableCard = ({ md, route, title, body }) => {
  return (
    <Card className="p-0">
      <Card.Body className="p-0">
        <Row className="card-header mx-auto border p-0 py-1">
          <Col
            md={md[0]}
            className="flex justify-center items-center text-inherit"
          >
            <Link
              to={route}
              className="text-inherit cursor-pointer"
              style={{ textUnderlineOffset: "3px" }}
            >
              {title?.first}
            </Link>
          </Col>
          <Col md={md[1]} className="mx-auto p-0">
            {title?.second}
          </Col>
          <Col md={md[2]} className="flex justify-center items-center">
            {title?.third}
          </Col>
        </Row>

        <ListGroup className="list-group-flush border-gray-400 h-28vh me-0 overflow-auto rounded-bottom">
          <ListGroupItem className="p-0">
            {keys(body).map((item) => {
              item = body[item];
              return (
                <Row key={item.id} className="mx-auto">
                  <Col
                    md={md[0]}
                    className="flex justify-center items-center border px-0 py-1"
                  >
                    <OverlayTooltip text={item.firstCol} />
                  </Col>
                  <Col
                    md={md[1]}
                    className="flex justify-center items-center border px-0 py-1"
                  >
                    <OverlayTooltip text={item.secondCol} />
                  </Col>
                  <Col
                    md={md[2]}
                    className="flex justify-center items-center border px-0 py-1"
                  >
                    <OverlayTooltip text={item.thirdCol} />
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

TableCard.propTypes = {
  md: PropTypes.array,
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  route: PropTypes.string.isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired
};

TableCard.defaultProps = {
  md: [4, 6, 2]
};

export default TableCard;
