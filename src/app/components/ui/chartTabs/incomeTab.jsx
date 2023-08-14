import { BarChart, axisClasses } from "@mui/x-charts";
import { useWindowInnerWidth } from "../../../utils";
import { useState } from "react";

// Генерация случайного числа в заданном диапазоне
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация данных
const generateData = () => {
  const data = [];
  for (let day = 1; day <= 30; day++) {
    data.push({
      day: `${day}`,
      products: getRandomValue(50, 200),
      transport: getRandomValue(20, 100),
      housing: getRandomValue(100, 500),
      rest: getRandomValue(10, 150),
      health: getRandomValue(5, 50)
    });
  }
  return data;
};

const data = generateData();

const BarsDataset = () => {
  const [windowWidth] = useWindowInnerWidth();

  const categoryColor = null;

  const getScrollClass = () => {
    return windowWidth > 800 ? "" : "overflow-scroll";
  };
  const valueFormatter = (value) => {
    return `${value} $`;
  };
  const getColor = () => {
    return categoryColor ? { color: categoryColor } : {};
  };

  const colorScheme = getColor();

  const chartParams = {
    series: [
      {
        dataKey: "health",
        label: "Здоровье",
        ...colorScheme,
        valueFormatter
      },
      {
        dataKey: "products",
        label: "Продукты",
        ...colorScheme,
        valueFormatter
      },
      {
        dataKey: "housing",
        label: "Жилье",
        ...colorScheme,
        valueFormatter
      },
      {
        dataKey: "rest",
        label: "Отдых",
        ...colorScheme,
        valueFormatter
      },
      {
        dataKey: "transport",
        label: "Транспорт",
        ...colorScheme,
        valueFormatter
      }
    ],
    height: 250,
    width: windowWidth > 800 ? windowWidth - 32 : 800
  };

  return (
    <div className={getScrollClass()}>
      <BarChart
        dataset={data}
        {...chartParams}
        xAxis={[
          {
            dataKey: "day",
            scaleType: "band",
            barGapRatio: 0.2,
            categoryGapRatio: 0.3
          }
        ]}
        series={chartParams.series.map((series) => ({
          ...series,
          highlightScope: {
            highlighted: "series",
            faded: "global"
          }
        }))}
        legend={{
          direction: "row",
          position: {
            vertical: "bottom",
            horizontal: "middle"
          }
        }}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "rotate(-70deg) "
          },
          "--ChartsLegend-rootOffsetX": "0px",
          "--ChartsLegend-rootOffsetY": "30px"
        }}
        margin={{ top: 10, bottom: 60, left: 40, right: 30 }}
      />
    </div>
  );
};

export default BarsDataset;
