import _ from "lodash";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";

/* eslint-disable react/prop-types */

const CardBody = ({ items }) => {
  const lines = _.times(10, (i) => `element ${i}`);
  const columns = [
    { label: "amount", value: "amount" },
    { label: "category", value: "category" },
    {
      label: "delete",
      value: (
        <Button variant="danger btn-sm py-0.5 px-1.5" onClick={console.log}>
          Удалить
        </Button>
      )
    }
  ];

  return (
    <ListGroup className="list-group-flush overflow-auto border-r border-gray-400 vh-25 me-0">
      {Object.values(items).map((item) => (
        <ListGroupItem key={item.id} className="p-0">
          <Row className="mx-auto">
            {columns.map(({ label, value }) => (
              <Col
                className="flex justify-center  items-center border px-0 py-1"
                key={label}
                md="4"
              >
                {label === "delete" ? (
                  value
                ) : (
                  <OverlayTooltip text={item[value]} />
                )}
              </Col>
            ))}
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CardBody;
