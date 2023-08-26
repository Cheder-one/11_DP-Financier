import { Currency, Entity } from "../../../types/userTypes";

const createNewAccount = ({
  newAccountId,
  name,
  entity,
  currency,
  value,
  iconName,
  iconColor,
  comment
}: {
  newAccountId: string;
  name: string;
  entity: Entity;
  currency: Currency;
  value: string;
  iconName: string;
  iconColor: string;
  comment: string;
}) => {
  const absoluteNum = Math.abs(parseFloat(value));
  const cleanBalance = String(absoluteNum);

  const newAccount = {
    id: newAccountId,
    type: "account",
    name: name.trim(),
    entity: entity.id,
    currency: currency.id,
    value: cleanBalance,
    transactions: [],
    icon: { name: iconName, color: iconColor },
    comment
  };

  return newAccount;
};

export default createNewAccount;
