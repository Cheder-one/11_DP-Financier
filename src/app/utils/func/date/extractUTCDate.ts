const extractDateInfo = (utcDate: string) => {
  const date = new Date(utcDate);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
};

export default extractDateInfo;
