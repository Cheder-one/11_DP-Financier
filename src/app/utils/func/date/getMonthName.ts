import dataConstants from "../../data/dataConstants";

const { MONTHS } = dataConstants;

const getMonthName = (date: Date): object => {
  date = date || new Date();
  const curMonthIndx = date.getMonth();
  const monthName = MONTHS[curMonthIndx];

  return monthName;
};

export default getMonthName;
