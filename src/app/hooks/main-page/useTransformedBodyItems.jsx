import { useMemo } from "react";
import { find, keys } from "lodash";
import { Button } from "react-bootstrap";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";
import numeral from "numeral";

const getTransactionCategory = (item, user) => {
  return find(user.categories, { id: item.category }).name;
};

const renderDelButton = (item, handleDelButtonClick) => (
  <Button
    id={item.id}
    variant=""
    size="sm"
    className="p-0"
    onClick={handleDelButtonClick}
  >
    <CloseX style={{ color: "red" }} size={20} />
  </Button>
);

const useTransformedBodyItems = (
  user,
  cardBodyItems,
  handleDelButtonClick
) => {
  const transformedBodyItems = useMemo(() => {
    const updatedCards = {};

    keys(cardBodyItems).forEach((key) => {
      const card = cardBodyItems[key];

      const updatedCard = card.map((item) => {
        const amount = numeral(item.amount).format("0,0");
        const getCurrencyData = (id) => {
          return find(user.currencies, { id });
        };

        return {
          ...item,
          firstCol: `${amount} ${
            getCurrencyData(item.currency).symbol
          }`,
          secondCol: getTransactionCategory(item, user),
          thirdCol: renderDelButton(item, handleDelButtonClick)
        };
      });

      updatedCards[key] = updatedCard;
    });

    return updatedCards;
    // eslint-disable-next-line
  }, [cardBodyItems, user.categories]);

  return transformedBodyItems;
};

export default useTransformedBodyItems;
