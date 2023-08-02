import { filter } from "lodash";
import { useMemo } from "react";
import { getUniqDates } from "../../utils";

const useFilterByUniqAndType = (user, selectedAccount) => {
  const filterByUniqAndType = useMemo(() => {
    const types = ["income", "expense"];
    const { id } = selectedAccount;
    const result = {};

    types.forEach((type) => {
      const transacts = filter(user.transactions, { type });
      // Создает массив уникальных дат транзакций для dropdownList
      let uniqDates = getUniqDates(transacts);

      // Фильтрует транзакции под конкретный счет (если выбран). Создает массив uniqDates.
      if (id.includes("account-id-")) {
        const accountTransacts = filter(transacts, { account: id });
        uniqDates = getUniqDates(accountTransacts);
      }

      result[type] = { transacts, uniqDates };
    });

    return result;
  }, [user.transactions, selectedAccount]);

  return filterByUniqAndType;
};

export default useFilterByUniqAndType;