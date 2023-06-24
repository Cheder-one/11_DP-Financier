import _ from "lodash";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import { xCenter } from "../typography/alignment-classes/centering";

const CardBody = () => {
  const bodyLines = _.times(10, (i) => `element ${i}`);
  const bodyLabels = _.times(3, (i) => `element ${i}`);

  return (
    <ListGroup
      className="list-group-flush overflow-auto"
      style={{
        borderRight: "1px solid #dee2e6",
        marginRight: "0px",
        // maxHeight: "8rem"
        height: "25vh"
      }}
    >
      {bodyLines.map((line) => (
        <ListGroupItem key={line} className="p-0">
          <Row className="mx-auto">
            {bodyLabels.map((label) => (
              <Col
                className={`d-flex ${xCenter} border p-0`}
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
