const getAmountByType = (amount: string, cardType: string) => {
  if (cardType === "expense") {
    const absoluteNum = Math.abs(parseFloat(amount));
    return String(-absoluteNum);
  } else {
    const absoluteNum = Math.abs(parseFloat(amount));
    return String(absoluteNum);
  }
};

export default getAmountByType;
