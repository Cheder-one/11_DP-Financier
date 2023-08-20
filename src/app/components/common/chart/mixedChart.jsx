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

import CustomTooltip from "./custom/customTooltip";
import { useWindowInnerWidth } from "../../../utils";
import { useState } from "react";

const MixedChart = ({ chartData, categories, averageLine }) => {
  const [windowWidth] = useWindowInnerWidth();

  const ChartComponent = averageLine ? ComposedChart : BarChart;

  return (
    <ChartComponent
      data={chartData}
      barGap={1}
      // barSize={5}
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
      <YAxis />
      <Tooltip content={<CustomTooltip />} />

      <Legend />
      <Brush height={25} dataKey="date" stroke="#3b82f6" />
      {categories.map((category) => (
        <Bar
          key={category.id}
          dataKey={category.name}
          fill={category.color || "#82ca9d"}
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
    </ChartComponent>
  );
};

export default MixedChart;
