import numeral from "numeral";

const tickAxisFormatter = (value: number) => {
  return numeral(value).format("0.0a");
};

export default tickAxisFormatter;
