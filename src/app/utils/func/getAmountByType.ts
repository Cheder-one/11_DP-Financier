const getAmountByType = (value: string, cardType: string) => {
  if (cardType === "expense") {
    const absoluteNum = Math.abs(parseFloat(value));
    return String(-absoluteNum);
  } else {
    const absoluteNum = Math.abs(parseFloat(value));
    return String(absoluteNum);
  }
};

export default getAmountByType;
