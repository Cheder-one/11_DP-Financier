import _ from "lodash";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import CardNavBar from "./cardNavBar";

const AccountCard = () => {
  const cardList = _.times(10);

  return (
    <>
      <ListGroup
        className="list-group-flush overflow-auto"
        style={{ maxHeight: "190px" }}
      >
        <CardNavBar />
        {cardList.map((el) => (
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
      </ListGroup>
    </>
  );
};

export default AccountCard;
