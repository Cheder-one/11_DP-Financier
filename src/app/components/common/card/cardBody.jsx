import _ from "lodash";
import { Col, Container, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";

const CardBody = () => {
  const bodyLines = _.times(5, (i) => `element ${i}`);
  const bodyLabels = _.times(3, (i) => `element ${i}`);

  return null;
};

export default CardBody;
