import PropTypes from "prop-types";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
import { useCallback, useEffect, useRef, useState } from "react";
import { find, filter } from "lodash";

const ALL = "Все";

const AccountCard = ({ card, categories, allTransacts }) => {
  const [dropdown, setDropdown] = useState(null);
  const [transactsByCondition, setTransactsByCondition] = useState(null);

  const renderComponent = useRef(0);

  useEffect(() => {
    renderComponent.current += 1;
  });

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
      let cardTransacts = allTransacts;

      if (dropdown.id.includes("all")) {
        const result = filter(allTransacts, { type: card.type });
        cardTransacts = result.length === 0 ? allTransacts : result;
      } else if (dropdown.id.includes("account")) {
        cardTransacts = filter(allTransacts, { account: dropdown.id });
      } else if (dropdown.id.includes("transaction")) {
        cardTransacts = filter(allTransacts, { date: dropdown.date });
      }

      cardTransacts = cardTransacts.map((transact) => ({
        ...transact,
        category: find(categories, { id: transact.category }).name
      }));

      setTransactsByCondition(cardTransacts);
    }
  }, [dropdown, allTransacts, card.type, categories]);

  return (
    <>
      <div className="account-card">
        <h1>{renderComponent.current}</h1>
        <CardHeader
          {...{ card, dropdown, ALL }}
          handleSelect={handleDropItemSelect}
        />
        <CardBody items={transactsByCondition} />
      </div>
    </>
  );
};

AccountCard.propTypes = {
  card: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  allTransacts: PropTypes.array.isRequired
};

export default AccountCard;
