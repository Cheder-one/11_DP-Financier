export const toReadableDate = (utcDate: string) => {
  let dateArr = new Date(utcDate).toLocaleString().split(",");
  let date = dateArr[0];
  let time = dateArr[1];
  time = time.slice(0, time.lastIndexOf(":"));

  return { date, time, full: date + time };
};
