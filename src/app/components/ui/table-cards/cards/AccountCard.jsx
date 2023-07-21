import PropTypes from "prop-types";
import TableCard from "../../../common/card/tableCard";
import CardDropdown from "../dropdown/cardDropdown";

const AccountCard = ({
  dropList: { account },
  bodyItems,
  onSelect,
  addButton
}) => {
  return (
    <TableCard
      route="/"
      title={{
        first: "Счет",
        second: (
          <CardDropdown items={account} type="account" onSelect={onSelect} />
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
  onSelect: PropTypes.func.isRequired,
  addButton: PropTypes.func.isRequired
};
export default AccountCard;
