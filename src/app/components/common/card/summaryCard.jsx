import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Category",
    value1: 10,
    value2: 20,
    value3: 30
  }
];

const SummaryCard = ({ title }) => {
  return (
    <div className="border rounded h-52 w-1/3">
      <div className="bg-gray-100 p-3 flex justify-between">
        <div className="text-lg font-bold">{title}</div>
        <button className="border rounded px-2">*</button>
      </div>
      <BarChart
        width={400}
        height={100}
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip formatter={(value, name, props) => `${value}%`} />
        <Legend />
        <Bar dataKey="value1" stackId="a" fill="#8884d8" />
        <Bar dataKey="value2" stackId="a" fill="#82ca9d" />
        <Bar dataKey="value3" stackId="a" fill="#ffc658" />
      </BarChart>
    </div>
  );
};

export default SummaryCard;
