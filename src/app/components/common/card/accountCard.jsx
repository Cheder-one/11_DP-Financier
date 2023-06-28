import PropTypes from "prop-types";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
import { useEffect, useState } from "react";
import { toReadableDate } from "../../../utils";
import _ from "lodash";

const ALL = "Все";
/* eslint-disable react/prop-types */

const AccountCard = ({ card, allTransacts }) => {
  const [dropdown, setDropdown] = useState(null);
  console.log(card);
  console.log(dropdown);

  // dropdown initial state
  useEffect(() => {
    setDropdown({
      id: `all-ids-${card.type}`,
      type: card.type,
      name: ALL,
      items: card.dropdown.map((item) => ({
        id: item.id,
        name: item.name || item.date
        // toReadableDate(item.date)[0]
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

  const selectedItem = {
    ...dropdown
  };
  console.log({ selectedItem });

  // У меня есть номер счета, нужно узнать какие были транзакции по нему
  const transactsOnAccount = _.filter(allTransacts, {
    account: selectedItem.id
  });

  // Есть дата, нужно узнать какие были транзакции в этот день
  const transactsOnAccount2 = _.filter(allTransacts, {
    date: selectedItem.date
  });

  return (
    <>
      <div className="account-card">
        <CardHeader
          card={card}
          handleSelect={handleDropItemSelect}
          dropdown={dropdown}
        />

        <CardBody items={transactsOnAccount2} />
      </div>
    </>
  );
};

AccountCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default AccountCard;
