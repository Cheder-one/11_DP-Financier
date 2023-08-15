const getCurrentMonthName = (): string => {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ];

  const curMonthIndx = new Date().getMonth();
  const monthName = months[curMonthIndx];

  return monthName;
};

export default getCurrentMonthName;
