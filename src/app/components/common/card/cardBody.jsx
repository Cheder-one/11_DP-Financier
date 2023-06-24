import _ from "lodash";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";

const CardBody = () => {
  const bodyLines = _.times(10, (i) => `element ${i}`);
  const bodyLabels = _.times(3, (i) => `element ${i}`);

  return (
    <ListGroup
      className="list-group-flush overflow-auto vh-25 me-0"
      style={{
        borderRight: "1px solid #dee2e6"
        // maxHeight: "8rem"
      }}
    >
      {bodyLines.map((line) => (
        <ListGroupItem key={line} className="p-0">
          <Row className="mx-auto">
            {bodyLabels.map((label) => (
              <Col
                className="d-flex justify-center border p-0"
                key={label}
                md="4"
              >
                <OverlayTooltip text={label} />
              </Col>
            ))}
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CardBody;
