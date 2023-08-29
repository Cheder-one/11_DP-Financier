import { find } from "lodash";
import { useEffect, useState } from "react";

const useTransactCrFormInputs = (user) => {
  const { currencies } = user;

  const getDefaultCurrency = (accountId) => {
    if (accountId) {
      const { currency } = find(user.accounts, { id: accountId });
      const defaultCurrency = find(currencies, { id: currency });
      return defaultCurrency;
    } else {
      return currencies[0];
    }
  };

  const [inputFields, setInputFields] = useState({
    account: { id: "", name: "" },
    category: { id: "", name: "" },
    currency: getDefaultCurrency(""),
    date: new Date(),
    value: "",
    comment: ""
  });

  useEffect(() => {
    setInputFields((prev) => ({
      ...prev,
      currency: getDefaultCurrency(prev.account.id)
    }));
  }, [inputFields.account]);

  return [inputFields, setInputFields];
};

export default useTransactCrFormInputs;
