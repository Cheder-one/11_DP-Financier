const getAmountByType = (amount: string, cardType: string) => {
  if (cardType === "expense") {
    //@ts-ignore
    return -parseFloat(amount, 10);
  }
  //@ts-ignore
  return parseFloat(amount, 10);
};

export default getAmountByType;
