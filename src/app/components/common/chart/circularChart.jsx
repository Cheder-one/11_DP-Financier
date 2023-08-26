import PropTypes from "prop-types";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import CustomLabel from "./custom/customLabel";
import { tooltipFormatter } from "../../../utils";

const CircularChart = ({ chartData, width, height }) => {
  // const cx = width / 2.05;
  // const cy = height / 3.15;

  // const data = [
  //   { name: "Сбербанк", value: 90000, color: "#82ca9d" },
  //   { name: "Альфа-банк", value: 7576935, color: "#FF6F61" },
  //   { name: "ВТБ", value: 500000, color: "#8884d8" },
  //   { name: "Газпромбанк", value: 300000, color: "#83a6ed" },
  //   { name: "Тинькофф", value: 2500000, color: "#8dd1e1" },
  //   { name: "Росбанк", value: 1500000, color: "#ffc658" }
  // ];

  return (
    <PieChart width={width} height={height / 1.5}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        label={<CustomLabel />}
        labelLine={false}
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        fill="#8884d8"
      >
        {chartData.map((item) => (
          <Cell key={item} fill={item.color} />
        ))}
      </Pie>
      <Tooltip formatter={tooltipFormatter} />
    </PieChart>
  );
};

CircularChart.propTypes = {
  chartData: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

export default CircularChart;
