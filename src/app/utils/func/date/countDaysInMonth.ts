const countDaysInMonth = (date: Date): number => {
  const day = date || new Date();
  const month = day.getMonth();
  const year = day.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return daysInMonth;
};

export default countDaysInMonth;
