import PropTypes from "prop-types";
import TableCard from "../../../common/card/tableCard";
import CardDropdown from "../dropdown/cardDropdown";

const IncomeCard = ({
  dropList: { income },
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
        first: "Доход",
        second: (
          <CardDropdown
            type="income"
            items={income.uniqDates}
            reset={reset}
            onSelect={onSelect}
            onPostSuccess={onPostSuccess}
          />
        ),
        third: addButton("income")
      }}
      body={bodyItems.income}
    />
  );
};

IncomeCard.propTypes = {
  dropList: PropTypes.shape({
    income: PropTypes.shape({
      uniqDates: PropTypes.arrayOf(PropTypes.object)
    })
  }).isRequired,
  bodyItems: PropTypes.object.isRequired,
  reset: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  addButton: PropTypes.func.isRequired
};

export default IncomeCard;
