import { BarChart, axisClasses } from "@mui/x-charts";
import { useWindowInnerWidth } from "../../../utils";

// Генерация случайного числа в заданном диапазоне
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация данных
const generateData = () => {
  const data = [];
  for (let day = 1; day <= 30; day++) {
    data.push({
      day,
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

const dataset = data;

const valueFormatter = (value) => `${value} $`;

const BarsDataset = () => {
  const [windowWidth] = useWindowInnerWidth();

  return (
    <BarChart
      dataset={dataset}
      height={350}
      width={windowWidth - 32}
      xAxis={[
        {
          dataKey: "day",
          scaleType: "band",
          categoryGapRatio: 0.3,
          barGapRatio: 0.3
        }
      ]}
      series={[
        { dataKey: "health", label: "Здоровье", valueFormatter },
        { dataKey: "products", label: "Продукты", valueFormatter },
        { dataKey: "housing", label: "Жилье", valueFormatter },
        { dataKey: "rest", label: "Отдых", valueFormatter },
        { dataKey: "transport", label: "Транспорт", valueFormatter }
      ]}
      legend={{
        direction: "row",
        position: {
          vertical: "bottom",
          horizontal: "middle"
        }
      }}
      sx={{
        "--ChartsLegend-rootOffsetX": "0px",
        "--ChartsLegend-rootOffsetY": "30px"
      }}
      // margin={{ top: 70, bottom: 70, left: 100, right: 100 }}
    />
  );
};

export default BarsDataset;
