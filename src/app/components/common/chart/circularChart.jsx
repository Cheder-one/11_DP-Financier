import PropTypes from "prop-types";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import CustomLabel from "./custom/customLabel";
import CustomTooltipPieChart from "./custom/customTooltipPieChart";

const CircularChart = ({ chartData, width, height, tooltip }) => {
  // const cx = width / 2.05;
  // const cy = height / 3.15;

  const parsedChartData = chartData.map((item) => ({
    ...item,
    value: Math.abs(parseInt(item.value))
  }));

  return (
    <PieChart width={width} height={height / 1.5}>
      <Pie
        data={parsedChartData}
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
      {tooltip || <Tooltip content={CustomTooltipPieChart} />}
    </PieChart>
  );
};

CircularChart.propTypes = {
  chartData: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  tooltip: PropTypes.node
};

export default CircularChart;
