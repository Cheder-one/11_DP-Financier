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

  // const selectedItem = { id: dropdown?.id, type: dropdown?.type };
  //

  // Вывод всех транзакций карточки Счета "Сбербанк"
  const selectedData = { id: "account-id-1", type: "account" };

  // У меня есть номер счета, нужно узнать какие были транзакции по нему

  const transOnAccount = _.filter(allTransacts, { account: selectedData.id });

  const handleDropItemSelect = (eventKeys) => {
    eventKeys = JSON.parse(eventKeys);
    setDropdown((prev) => ({
      ...prev,
      name: eventKeys.name,
      id: eventKeys.id
    }));
  };

  useEffect(() => {
    setDropdown({
      id: `all-ids-${card.type}`,
      type: card.type,
      name: ALL,
      items: card.dropdown.map((item) => ({
        id: item.id,
        name: item.name || toReadableDate(item.date)[0]
      }))
    });
  }, [card]);

  return (
    <>
      <div className="account-card">
        <CardHeader
          card={card}
          handleSelect={handleDropItemSelect}
          dropdown={dropdown}
        />

        <CardBody items={transOnAccount} />
      </div>
    </>
  );
};

AccountCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default AccountCard;
