const getChartTitleClass = (type: string) => {
  return (
    "flex justify-center items-center underline underline-offset-3 " +
    (type === "income"
      ? "decoration-green-500"
      : type === "expense"
      ? "decoration-rose-500"
      : "decoration-blue-500")
  );
};

export default getChartTitleClass;
