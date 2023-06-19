import _ from "lodash";
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  NavDropdown,
  Row,
  Table
} from "react-bootstrap";
import CardHeader from "./cardHeader";
import Divider from "../typography/divider";
import CardBody from "./cardBody";
import OverlayTooltip from "../typography/overlayTooltip";

const AccountCard = () => {
  const cardElements = _.times(10);

  const bodyLines = _.times(5);
  const bodyLabels = _.times(3, (i) => `Счет ${16 ** (4 + i)}`);

  const dropdown = (
    <NavDropdown title="Основной" id="basic-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    </NavDropdown>
  );

  return (
    <>
      <Row className="mx-auto border">
        <Col md="4" className="border d-flex justify-content-center">
          Счета
        </Col>
        <Col md="4" className="border d-flex justify-content-center">
          <OverlayTooltip>
            <NavDropdown title={"Основнойssssssss"} id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Action</NavDropdown.Item>
            </NavDropdown>
          </OverlayTooltip>
        </Col>
        <Col md="4" className="border d-flex justify-content-center">
          Action
        </Col>
      </Row>

      {bodyLines.map((line) => (
        <Row key={line} className="mx-auto border">
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
      ))}

      {/* <CardHeader />
      <Divider />
      <ListGroup
        className="list-group-flush overflow-auto"
        style={{ maxHeight: "132px" }}
      >
        {cardElements.map((el) => (
          <ListGroupItem
            key={el}
            className="d-flex justify-content-between align-items-center"
          >
            <span className="me-2">Sum</span>
            <span className="me-2">Category</span>
            <Button variant="danger" className="btn-sm p-1">
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup> */}
    </>
  );
};

export default AccountCard;
