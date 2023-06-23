import PropTypes from "prop-types";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";

const AccountCard = ({ card }) => {
  return (
    <>
      <div className="account-card">
        <CardHeader card={card} />
        <CardBody />
      </div>
    </>
  );
};

AccountCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default AccountCard;
