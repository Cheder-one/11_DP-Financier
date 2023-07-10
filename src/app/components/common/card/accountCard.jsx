import PropTypes from "prop-types";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { keys } from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AccountCard = ({ md, title, route, type, bodyList, bodyCol }) => {
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

        <ListGroup className="list-group-flush overflow-auto border-gray-400 vh-27 me-0">
          <ListGroupItem className="p-0">
            {keys(bodyList).map((item) => {
              item = bodyList[item];
              return (
                <Row key={item.id} className="mx-auto">
                  <Col
                    md={md[0]}
                    className="flex justify-center items-center border px-0 py-1"
                  >
                    {bodyCol?.first || item.firstCol}
                  </Col>
                  <Col
                    md={md[1]}
                    className="flex justify-center items-center border px-0 py-1"
                  >
                    {bodyCol?.second || item.secondCol}
                  </Col>
                  <Col
                    md={md[2]}
                    className="flex justify-center items-center border px-0 py-1"
                  >
                    {bodyCol?.third || item.thirdCol}
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

AccountCard.propTypes = {
  md: PropTypes.array,
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  route: PropTypes.string.isRequired,
  type: PropTypes.string,
  bodyList: PropTypes.arrayOf(PropTypes.object).isRequired,
  bodyCol: PropTypes.object.isRequired
};

AccountCard.defaultProps = {
  md: [4, 6, 2]
};

export default AccountCard;
