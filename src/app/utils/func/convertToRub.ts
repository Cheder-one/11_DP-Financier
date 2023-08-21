import { Currency } from "../../types";
import getActualQuotes from "../service/getActualQuotes";

const convertToRub = (
  currencyData: Currency,
  value: number,
  actualQuotes: object
) => {
  const quotes = actualQuotes.Valute;
  const { code } = currencyData;
  let convertedAmount = 0;

  for (const valuta in quotes) {
    const { CharCode, Value } = quotes[valuta];
    if (code === CharCode) {
      convertedAmount = parseInt(value) * Value;
    }
  }
  return parseInt(convertedAmount);
};

export default convertToRub;
