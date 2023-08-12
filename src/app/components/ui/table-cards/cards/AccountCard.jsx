import PropTypes from "prop-types";
import TableCard from "../../../common/card/tableCard";
import CardDropdown from "../dropdown/cardDropdown";

const AccountCard = ({
  dropList: { account },
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
        first: "Счет",
        second: (
          <CardDropdown
            items={account}
            type="account"
            reset={reset}
            onSelect={onSelect}
            onPostSuccess={onPostSuccess}
          />
        ),
        third: addButton("account")
      }}
      body={bodyItems.account}
    />
  );
};

AccountCard.propTypes = {
  dropList: PropTypes.shape({
    account: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  bodyItems: PropTypes.object.isRequired,
  reset: PropTypes.bool,
  addButton: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onPostSuccess: PropTypes.func.isRequired
};
export default AccountCard;
