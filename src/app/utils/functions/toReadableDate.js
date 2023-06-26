export const toReadableDate = (date) =>
  new Date(date).toLocaleString().split(",");
