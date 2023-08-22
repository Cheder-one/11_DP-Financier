const convertToRub = (
  currencyCode: string,
  value: number,
  actualQuotes: object
) => {
  if (currencyCode === "RUB") return value;

  const quotes = actualQuotes.Valute;
  let convertedAmount = 0;

  for (const valuta in quotes) {
    const { CharCode, Value } = quotes[valuta];
    if (currencyCode === CharCode) {
      convertedAmount = parseInt(value) * Value;
    }
  }
  return parseInt(convertedAmount);
};

export default convertToRub;
