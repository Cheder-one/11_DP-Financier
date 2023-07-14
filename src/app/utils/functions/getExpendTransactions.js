import { filter, find } from "lodash";

const getExpendTransactions = (user, accountId) => {
  const account = find(user.accounts, { id: accountId });

  if (account) {
    return filter(
      user.transactions,
      (t) => t.account === account.id && t.type === "expense"
    );
  }

  return [];
};

export default getExpendTransactions;
