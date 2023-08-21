import PropTypes from "prop-types";
import { TableCard } from "../../../common/card";
import CardDropdown from "../dropdown/cardDropdown";

const ExpenseCard = ({
  dropList: { expense },
  bodyItems,
  reset,
  addButton,
  onSelect,
  onPostSuccess
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
            reset={reset}
            onSelect={onSelect}
            onPostSuccess={onPostSuccess}
          />
        ),
        third: addButton("expense")
      }}
      body={bodyItems.expense}
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
  addButton: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onPostSuccess: PropTypes.func.isRequired
};

export default ExpenseCard;
