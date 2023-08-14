import { BarChart, axisClasses } from "@mui/x-charts";
import { useWindowInnerWidth } from "../../../utils";
import { Box, Slider } from "@mui/material";
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

const categoryColor = null;

const getScrollClass = (windowWidth) => {
  return windowWidth > 800 ? "" : "overflow-scroll";
};
const valueFormatter = (value) => {
  return `${value} $`;
};
const getColor = () => {
  return categoryColor ? { color: categoryColor } : {};
};

const data = generateData();

const BarsDataset = () => {
  const [windowWidth] = useWindowInnerWidth();

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
    width: windowWidth > 800 ? windowWidth - 32 : 800,
    margin: { top: 10, bottom: 60, left: 40, right: 30 }
  };

  const minDistance = 1;

  const [value, setValue] = useState([10, 20]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <div className={getScrollClass(windowWidth)}>
      <Box sx={{ width: "100%", maxWidth: "50%" }}>
        <BarChart
          dataset={data}
          {...chartParams}
          xAxis={[
            {
              label: "dsd",
              dataKey: "day",
              scaleType: "band",
              barGapRatio: 0.2,
              categoryGapRatio: 0.3,
              min: value[0],
              max: value[1]
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
            // [`.${axisClasses.bottom} .${axisClasses.label}`]: {
            //   transform: "rotate(-50deg)",
            //   transformOrigin: "center"
            // },
            "--ChartsLegend-rootOffsetX": "0px",
            "--ChartsLegend-rootOffsetY": "30px"
          }}
        />
        {/* <Slider
          className="ml-50%"
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={1}
          max={30}
          sx={{ mt: 2 }}
        /> */}
      </Box>
    </div>
  );
};

export default BarsDataset;
