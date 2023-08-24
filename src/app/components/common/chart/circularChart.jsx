import PropTypes from "prop-types";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import CustomLabel from "./custom/customLabel";

const CircularChart = ({ chartData, categories, width, height }) => {
  const data = [
    { name: "Продукты", value: 400 },
    { name: "Такси ", value: 300 },
    { name: "Кофе", value: 300 },
    { name: "Транспорт ", value: 200 },
    { name: "Жилье ", value: 500 },
    { name: "Other", value: 1000 }
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A83279",
    "#5F5A8D"
  ];

  const cx = width / 2.05;
  const cy = height / 3.15;

  return (
    <PieChart width={width} height={height / 1.5}>
      <Pie
        cx={cx}
        cy={cy}
        data={data}
        dataKey="value"
        label={<CustomLabel />}
        labelLine={false}
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default CircularChart;
