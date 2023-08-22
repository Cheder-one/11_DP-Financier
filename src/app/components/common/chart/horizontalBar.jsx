import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import numeral from "numeral";

import {
  tickAxisFormatter,
  useWindowInnerWidth
} from "../../../utils";

const HorizontalBar = ({ chartData, categories, width }) => {
  const [windowWidth] = useWindowInnerWidth();

  const tooltipFormatter = (value, name, props) => {
    return value;
    const currency = value.split(" ")[1];
    return `${numeral(value).format("0,0")} ${currency}`;
  };

  return (
    <BarChart
      width={width - 10 || windowWidth}
      height={50}
      data={chartData}
      layout="vertical"
      margin={{ left: -50 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" tickFormatter={tickAxisFormatter} />
      <YAxis dataKey="name" type="category" tick={false} />
      <Tooltip formatter={tooltipFormatter} />
      {/* <Legend /> */}
      {categories.map((category) => (
        <Bar
          stackId="a"
          key={category.id}
          dataKey={category.name}
          unit={category.unit}
          fill={category.color}
        />
      ))}

      <Bar dataKey="Сбербанк" stackId="a" fill="#8884d8" />
      <Bar
        dataKey="Альфа-банк"
        stackId="a"
        unit={"her"}
        fill="#82ca9d"
      />
    </BarChart>
  );
};

export default HorizontalBar;
