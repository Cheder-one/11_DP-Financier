import numeral from "numeral";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import {
  tickAxisFormatter,
  useWindowInnerWidth
} from "../../../utils";

const HorizontalBar = ({
  chartData,
  categories,
  width,
  containerClass,
  formatter
}) => {
  const [windowWidth] = useWindowInnerWidth();

  const tooltipFormatter = (value, name, props, index, entry) => {
    if (typeof formatter === "function") {
      return formatter(value, name, props, index, entry);
    } else {
      return `${numeral(value).format("0,0")} `;
    }
  };

  return (
    <div className={containerClass}>
      <BarChart
        width={width - 10 || windowWidth}
        height={80}
        data={chartData}
        layout="vertical"
        margin={{ left: -50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={tickAxisFormatter} />
        <YAxis dataKey="name" type="category" tick={false} />
        <Tooltip formatter={tooltipFormatter} />
        {categories.map((category) => (
          <Bar
            stackId="a"
            key={category.id}
            dataKey={category.name}
            unit={category.unit}
            fill={category.color}
          />
        ))}
      </BarChart>
    </div>
  );
};

HorizontalBar.propTypes = {
  chartData: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  width: PropTypes.number,
  containerClass: PropTypes.string,
  formatter: PropTypes.func
};

export default HorizontalBar;
