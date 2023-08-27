const convertToRub = (
  value: number,
  currencyCode: string,
  actualQuotes: object
) => {
  if (currencyCode === "RUB") return value;

  const quotes = actualQuotes.Valute;
  let convertedAmount = 0;

  for (const valuta in quotes) {
    const { CharCode, Value, Nominal } = quotes[valuta];
    if (currencyCode === CharCode) {
      convertedAmount = (parseInt(value) * Value) / Nominal;
    }
  }
  return parseInt(convertedAmount);
};

export default convertToRub;
