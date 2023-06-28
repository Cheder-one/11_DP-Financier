import PropTypes from "prop-types";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
import { useEffect, useState } from "react";
import _ from "lodash";

const ALL = "Все";

const AccountCard = ({ card, allTransacts }) => {
  const [dropdown, setDropdown] = useState(null);
  const [transactsOnAccount, setTransactsOnAccount] = useState(null);
  console.log(card);
  console.log(dropdown);
  console.log(allTransacts);

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
    let cardTransacts = null;
    if (dropdown) {
      if (dropdown.id.includes("all")) {
        cardTransacts = _.filter(allTransacts, { type: card.type });

        if (cardTransacts.length === 0) {
          cardTransacts = allTransacts;
        }
      } else if (dropdown.id.includes("account")) {
        cardTransacts = _.filter(allTransacts, {
          account: dropdown.id
        });
      } else if (dropdown.id.includes("transaction")) {
        cardTransacts = _.filter(allTransacts, {
          date: dropdown.date
        });
      }
      setTransactsOnAccount(cardTransacts);
    }
  }, [dropdown, allTransacts, card.type]);

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
