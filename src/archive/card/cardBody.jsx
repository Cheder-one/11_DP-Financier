import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OverlayTooltip from "../../app/components/common/typography/overlayTooltip";
import { Image } from "react-bootstrap";

const X_SQUARE_SRC = "src/app/assets/x-square.svg";
/* eslint-disable react/prop-types */

const CardBody = ({ items }) => {
  const columns = [
    { label: "amount" },
    { label: "category" },
    {
      label: "delete",
      renderValue: (item) => (
        <Image
          onClick={() => console.log(`${item.id} delete`)}
          src={X_SQUARE_SRC}
          className="rounded-sm cursor-pointer select-none active:bg-red-300 duration-100"
        />
      )
    }
  ];

  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center m-1">Нет данных для отображения</div>
    );
  }

  return (
    <ListGroup className="list-group-flush overflow-auto border-gray-400 vh-25 me-0">
      {items.map((item) => (
        <ListGroupItem key={item.id} className="p-0">
          <Row className="mx-auto">
            {columns.map(({ label, renderValue }) => (
              <Col
                className="flex justify-center items-center border px-0 py-0.5"
                md={label === "delete" ? 2 : label === "amount" ? 4 : 6}
                key={label}
              >
                {renderValue ? (
                  renderValue(item)
                ) : (
                  <OverlayTooltip text={item[label]} />
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