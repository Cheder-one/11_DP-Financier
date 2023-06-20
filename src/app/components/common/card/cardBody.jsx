import _ from "lodash";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";

const CardBody = () => {
  const bodyLines = _.times(5, (i) => `element ${i}`);
  const bodyLabels = _.times(3, (i) => `element ${i}`);

  return (
    <ListGroup
      className="list-group-flush overflow-auto"
      style={{ maxHeight: "140px" }}
    >
      {bodyLines.map((line) => (
        <ListGroupItem key={line} className="p-0">
          <Row className="mx-auto border">
            {bodyLabels.map((label) => (
              <Col
                key={label}
                md="4"
                className="border p-0 d-flex justify-content-center"
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
