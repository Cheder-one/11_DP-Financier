import numeral from "numeral";

const tooltipFormatter = (value: number) => {
  return numeral(value).format("0,0") + " ₽";
};

export default tooltipFormatter;
