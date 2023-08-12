import { useState } from "react";

const useCardItems = () => {
  const [cardItems, setCardItems] = useState({
    account: [],
    income: [],
    expense: []
  });

  return [cardItems, setCardItems];
};

export default useCardItems;
