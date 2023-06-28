export const toReadableDate = (date: string) =>
  new Date(date).toLocaleString().split(",");
