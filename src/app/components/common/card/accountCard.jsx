import _ from "lodash";
import {
  Button,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Table,
  Tooltip
} from "react-bootstrap";
import CardHeder from "./cardHeder";
import Divider from "../typography/divider";
import CardBody from "./cardBody";

const AccountCard = () => {
  const cardElements = _.times(10);

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="tooltip">Full text goes here...</Tooltip>}
      >
        <div
          className="container"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          Some long text goes here and it will be truncated if it exceeds 100px
          width.
        </div>
      </OverlayTrigger>

      {/* <CardHeder />
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
