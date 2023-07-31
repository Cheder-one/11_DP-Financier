import PropTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";
import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";

import AccountCard from "./cards/AccountCard";
import ExpenseCard from "./cards/ExpenseCard";
import IncomeCard from "./cards/IncomeCard";

const TableCardsShell = ({
  dropList,
  bodyItems,
  reset,
  onSelect,
  onAddButtonClick
}) => {
  const addButton = (type) => (
    <Button variant="" className="p-0" onClick={() => onAddButtonClick(type)}>
      <PlusSquare className="text-lime-500" size={25} />
    </Button>
  );

  return (
    <Row className="mt-3%">
      <Col md="4" className="mb-3 mb-md-0">
        <IncomeCard
          reset={reset.transacts}
          {...{ dropList, bodyItems, onSelect, addButton }}
        />
      </Col>
      <Col md="4" className="mb-3 mb-md-0">
        <AccountCard
          reset={reset.account}
          {...{ dropList, bodyItems, onSelect, addButton }}
        />
      </Col>
      <Col md="4" className="mb-3 mb-md-0">
        <ExpenseCard
          reset={reset.transacts}
          {...{ dropList, bodyItems, onSelect, addButton }}
        />
      </Col>
    </Row>
  );
};

TableCardsShell.propTypes = {
  dropList: PropTypes.shape({
    income: PropTypes.object.isRequired,
    account: PropTypes.arrayOf(PropTypes.object).isRequired,
    expense: PropTypes.object.isRequired
  }),
  bodyItems: PropTypes.object.isRequired,
  reset: PropTypes.shape({
    account: PropTypes.bool.isRequired,
    transacts: PropTypes.bool.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired
};

export default TableCardsShell;
