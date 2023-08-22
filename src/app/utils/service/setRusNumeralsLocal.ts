import numeral from "numeral";

const setRusNumeralsLocal = () => {
  numeral.register("locale", "ru", {
    delimiters: {
      thousands: " ",
      decimal: ","
    },
    abbreviations: {
      thousand: "k",
      million: "m",
      billion: "b",
      trillion: "t"
    },
    ordinal: function (number: number) {
      if (number === 11 || number === 12 || number === 13) {
        return "th"; // Для чисел 11, 12, 13 используется "th"
      }

      const lastDigit = number % 10;
      switch (lastDigit) {
        case 1:
          return "ый";
        case 2:
          return "ой";
        case 3:
          return "ий";
        case 4:
        case 0:
          return "ый";
        default:
          return "ый";
      }
    },
    currency: {
      symbol: "₽"
    }
  });

  // Устанавливаем русскую локаль
  numeral.locale("ru");
};

export default setRusNumeralsLocal;
