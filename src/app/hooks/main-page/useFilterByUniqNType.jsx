import { filter } from "lodash";
import { useMemo } from "react";
import { getUniqDates, isFilterBy } from "../../utils";

const useFilterByUniqNType = (user, id) => {
  const filterByUniqAndType = useMemo(() => {
    const result = {};
    const types = ["income", "expense"];

    types.forEach((type) => {
      const transacts = filter(user.transactions, { type });
      let uniqDates = getUniqDates(transacts);

      if (isFilterBy.account(id)) {
        const accountTransacts = filter(transacts, { account: id });
        uniqDates = getUniqDates(accountTransacts);
      }

      result[type] = { transacts, uniqDates };
    });

    return result;
  }, [user.transactions, id]);

  return filterByUniqAndType;
};

export default useFilterByUniqNType;
