const SummaryCard = ({ title }) => {
  return (
    <div className="border rounded h-52 w-1/3">
      <div className="bg-gray-100 p-3 flex justify-between">
        <div className="text-lg font-bold">{title}</div>
        <button className="border rounded px-2">*</button>
      </div>
    </div>
  );
};

export default SummaryCard;
