import _ from "lodash";
import { Button, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import CardHeder from "./cardHeder";
import Divider from "../typography/divider";
import CardBody from "./cardBody";

const AccountCard = () => {
  const cardElements = _.times(10);

  return (
    <>
      <CardHeder />
      {/* <Table striped bordered hover> */}
      <CardBody />
      {/* </Table> */}

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
