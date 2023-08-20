import { useState } from "react";

const useTransactCrFormInputs = () => {
  const [inputFields, setInputFields] = useState({
    account: { id: "", name: "" },
    category: { id: "", name: "" },
    currency: {
      id: "currency-id-1",
      name: "Российский Рубль (RUB)",
      code: "RUB",
      symbol: "₽"
    },
    date: new Date(),
    amount: "",
    comment: ""
  });

  return [inputFields, setInputFields];
};

export default useTransactCrFormInputs;
