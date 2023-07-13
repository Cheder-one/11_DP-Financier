import PropTypes from "prop-types";
import TableCard from "../../../common/card/tableCard";
import CardDropdown from "../dropdown/cardDropdown";

const ExpenseCard = ({
  dropList: { expense },
  bodyItems,
  reset,
  onSelect,
  addButton
}) => {
  return (
    <TableCard
      route="/"
      title={{
        first: "Расход",
        second: (
          <CardDropdown
            items={expense.uniqDates}
            type="expense"
            onSelect={onSelect}
            reset={reset}
          />
        ),
        third: addButton
      }}
      body={bodyItems.income}
    />
  );
};

ExpenseCard.propTypes = {
  dropList: PropTypes.shape({
    expense: PropTypes.shape({
      uniqDates: PropTypes.arrayOf(PropTypes.object)
    })
  }).isRequired,
  bodyItems: PropTypes.object.isRequired,
  reset: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  addButton: PropTypes.node.isRequired
};

export default ExpenseCard;
