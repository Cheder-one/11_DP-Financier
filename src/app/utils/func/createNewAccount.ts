import { Account, Category } from "../../types/userTypes";
import getAmountByType from "./getAmountByType";


// account,
// currency,
// name,
// icon,
// iconColor,
// balance,
// comment
const createNewAccount = ({
  newAccountId,
      account: {},
      currency: {},
      name: "",
      icon: "VscBlank",
      iconColor: "#00000",
      balance: "",
      comment: ""
}: {}) => {
  const newAccount = {
       id: "account-id-1",
       type: "account",
       name: name.trim(),
       public: false,
       category: "category-id-1",
       balance: 90000,
       transactions: [
        "transaction-id-1",
        "transaction-id-2",
        "transaction-id-5",
        "transaction-id-6"
      ],
      comment: ""
  };
  return newAccount;
};

export default createNewAccount;
