const getExchangeRateClass = (today: number, prev: number) => {
  return (
    (today === prev
      ? "bg-neutral-300"
      : today > prev
      ? "bg-green-400"
      : "bg-red-400") + " p-1 rounded"
  );
};

export default getExchangeRateClass;
