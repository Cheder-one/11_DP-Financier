import PropTypes from "prop-types";
import {
  Area,
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import {
  tickAxisFormatter,
  tooltipFormatter,
  useWindowInnerWidth
} from "../../../utils";

const MixedChart = ({ chartData, categories, averageLine }) => {
  const [windowWidth] = useWindowInnerWidth();

  const ChartComponent = averageLine ? ComposedChart : BarChart;

  return (
    <>
      <ChartComponent
        data={chartData}
        barGap={1}
        barCategoryGap={5}
        height={300}
        width={windowWidth - 32}
        margin={{
          top: 10,
          bottom: 10,
          left: 0,
          right: 60
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" scale="auto" />
        <YAxis tickFormatter={tickAxisFormatter} />
        <Tooltip formatter={tooltipFormatter} />

        <Legend
          formatter={(value, entry, index) => (
            <span className="text-sm mt-3">{value}</span>
          )}
        />
        <Brush height={25} dataKey="date" stroke="#3b82f6" />
        {categories.map((category) => (
          <Bar
            key={category.id}
            dataKey={category.name}
            unit={category.unit}
            fill={category.color || "#8884d8"}
          />
        ))}
        {averageLine && (
          <>
            <Area
              type="step"
              dataKey="avg"
              fill="#8884d8"
              stroke="#f97316"
            />
          </>
        )}
        {/* <Customized
          component={<ChartEndLabel value={"Всего: 100k"} />}
          x={-60}
          y={30}
        /> */}
      </ChartComponent>
    </>
  );
};

MixedChart.propTypes = {
  chartData: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  averageLine: PropTypes.bool
};

export default MixedChart;
