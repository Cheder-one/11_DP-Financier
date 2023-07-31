const getAmountByType = (amount: string, cardType: string) => {
  if (cardType === "expense") {
    const num = parseInt(amount);
    const absoluteNum = Math.abs(num);
    return -parseFloat(absoluteNum, 10);
  } else {
    const num = parseInt(amount);
    const absoluteNum = Math.abs(num);
    return parseFloat(absoluteNum, 10);
  }
};

export default getAmountByType;
