const getAmountByType = (amount: string, cardType: string) => {
  if (cardType === "expense") {
    return -parseInt(amount, 10);
  }
  return parseInt(amount, 10);
};

export default getAmountByType;
