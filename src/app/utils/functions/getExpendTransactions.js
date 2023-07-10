import _ from "lodash";

export const getExpendTransactions = (user, accountId) => {
  const account = _.find(user.accounts, { id: accountId });

  if (account) {
    return _.filter(
      user.transactions,
      (t) => t.account === account.id && t.type === "expense"
    );
  }

  return [];
};
