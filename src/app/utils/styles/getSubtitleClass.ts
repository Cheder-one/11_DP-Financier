const getSubtitleClass = (type: string) => {
  return (
    "font-space-mono font-bold text-lg " +
    (type === "income"
      ? "text-green-500"
      : type === "expense"
      ? "text-rose-500"
      : "text-blue-500")
  );
};

export default getSubtitleClass;
