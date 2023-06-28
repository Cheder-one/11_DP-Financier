import PropTypes from "prop-types";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
import { useEffect, useState } from "react";
import _ from "lodash";

const ALL = "Все";

const AccountCard = ({ card, allTransacts }) => {
  const [dropdown, setDropdown] = useState(null);
  const [transactsOnAccount, setTransactsOnAccount] = useState(null);

  useEffect(() => {
    setDropdown({
      id: `all-ids`,
      type: card.type,
      name: ALL,
      items: card.dropdown.map((item) => ({
        id: item.id,
        name: item.name || item.date
      }))
    });
  }, [card]);

  const handleDropItemSelect = (eventKeys) => {
    eventKeys = JSON.parse(eventKeys);
    setDropdown((prev) => ({
      ...prev,
      id: eventKeys.id,
      name: eventKeys.name,
      date: eventKeys.date
    }));
  };

  useEffect(() => {
    let transacts = null;
    if (dropdown && dropdown.id.includes("all")) {
      transacts = allTransacts;
    } else if (dropdown && dropdown.id.includes("account")) {
      transacts = _.filter(allTransacts, {
        account: dropdown.id
      });
    } else if (dropdown && dropdown.id.includes("transaction")) {
      transacts = _.filter(allTransacts, {
        date: dropdown.date
      });
    }
    setTransactsOnAccount(transacts);
  }, [dropdown, allTransacts]);

  return (
    <>
      <div className="account-card">
        <CardHeader
          card={card}
          handleSelect={handleDropItemSelect}
          dropdown={dropdown}
        />

        <CardBody items={transactsOnAccount} />
      </div>
    </>
  );
};

AccountCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default AccountCard;
