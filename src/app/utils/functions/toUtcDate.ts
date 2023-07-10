export const toEtcDate = (date: string) => {
  const [day, month, year] = date.split(".");
  return new Date(`${month}-${day}-${year}`);
};
