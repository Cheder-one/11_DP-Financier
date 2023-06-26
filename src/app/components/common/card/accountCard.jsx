import PropTypes from "prop-types";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
import { useEffect, useState } from "react";
import { toReadableDate } from "../../../utils";
import _ from "lodash";

const ALL = "Все";

const AccountCard = ({ card }) => {
  const [dropdown, setDropdown] = useState(null);
  console.log({ dropdown });
  console.log({ card });

  const selectedItemId = dropdown?.id;

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

        <CardBody items={""} />
      </div>
    </>
  );
};

AccountCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default AccountCard;
