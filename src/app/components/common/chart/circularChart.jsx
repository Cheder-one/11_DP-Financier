import PropTypes from "prop-types";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import CustomLabel from "./custom/customLabel";

const CircularChart = ({ chartData, categories, width, height }) => {
  const data = [
    { name: "Продукты", value: 400, color: "#0088FE" },
    { name: "Такси ", value: 300, color: "#00C49F" },
    { name: "Кофе", value: 300, color: "#FFBB28" },
    { name: "Транспорт ", value: 200, color: "#FF8042" },
    { name: "Жилье ", value: 500, color: "#A83279" },
    { name: "Other", value: 1000, color: "#5F5A8D" }
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
        {data.map((item) => (
          <Cell key={item} fill={item.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

CircularChart.propTypes = {
  chartData: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

export default CircularChart;
