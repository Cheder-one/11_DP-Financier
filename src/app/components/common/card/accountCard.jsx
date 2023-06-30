import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { find, filter } from "lodash";

import CardHeader from "./cardHeader";
import CardBody from "./cardBody";

const ALL = "Все";

const AccountCard = ({ card, categories, allTransacts }) => {
  const [dropdown, setDropdown] = useState(null);
  const [transactsByCondition, setTransactsByCondition] = useState(null);

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

  const handleDropItemSelect = useCallback((eventKeys) => {
    eventKeys = JSON.parse(eventKeys);
    setDropdown((prev) => ({
      ...prev,
      id: eventKeys.id,
      name: eventKeys.name,
      date: eventKeys.date
    }));
  }, []);

  useEffect(() => {
    if (dropdown) {
      let cardTransacts = null;
      const { id, date } = dropdown;

      if (id.includes("all")) {
        const result = filter(allTransacts, { type: card.type });
        cardTransacts = result.length === 0 ? allTransacts : result;
      } else if (id.includes("account")) {
        cardTransacts = filter(allTransacts, { account: id });
      } else if (id.includes("transaction")) {
        cardTransacts = filter(allTransacts, { date });
      }

      cardTransacts = cardTransacts.map((transact) => ({
        ...transact,
        category: find(categories, { id: transact.category }).name
      }));

      setTransactsByCondition(cardTransacts);
    }
  }, [dropdown, allTransacts, card.type, categories]);

  return (
    <div className="account-card">
      <CardHeader
        {...{ card, dropdown, ALL }}
        handleSelect={handleDropItemSelect}
      />
      <CardBody items={transactsByCondition} />
    </div>
  );
};

AccountCard.propTypes = {
  card: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  allTransacts: PropTypes.array.isRequired
};

export default AccountCard;
