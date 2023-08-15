import PropTypes from "prop-types";
import { BarChart } from "@mui/x-charts";
import {
  countDaysInMonth,
  extractDateInfo,
  getCurrentMonthName,
  useWindowInnerWidth
} from "../../../utils";
import { Box } from "@mui/material";
import userPropTypes from "../../../types/userPropTypes";
import { filter, find, lowerCase, range } from "lodash";

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

// Move to Utils
const getScrollClass = (windowWidth) => {
  return windowWidth > 800 ? "" : "overflow-scroll";
};
// Move to Utils
const valueFormatter = (value) => {
  return `${value} $`;
};
// Move to Utils
const getColor = () => {
  return categoryColor ? { color: categoryColor } : {};
};

const data = generateData();
const colorScheme = getColor();

const IncomeTab = ({ user }) => {
  const { transactions, categories, currencies } = user;

  const [windowWidth] = useWindowInnerWidth();

  console.log(transactions);

  const incomeTransacts = filter(transactions, {
    type: "income"
  });
  const getCategoryName = (id) => {
    const category = find(categories, { id });
    return category.name;
  };
  const getCurrencyName = (id) => {
    const currency = find(currencies, { id });
    return lowerCase(currency.code);
  };

  const transactsData = transactions.map((transact) => {
    const { date, category, currency } = transact;
    const { day, month, year } = extractDateInfo(date);
    const categoryName = getCategoryName(category);
    const currencyName = getCurrencyName(currency);

    return {
      [categoryName]: transact.amount,
      currency: currencyName,
      date: { day, month, year }
    };
  });

  // const currMonth = new Date().getMonth() + 1;
  const dayInCurrMonth = countDaysInMonth();
  const currentMonthDatesArr = range(1, dayInCurrMonth + 1);

  const charData = currentMonthDatesArr.map((monthDay) => {
    const transactsOnMonthDay = transactsData.find(
      ({ date }) => date.day === monthDay
    );

    return {
      day: monthDay,
      ...transactsOnMonthDay
    };
  });

  const params = categories.map((category) => ({
    dataKey: category.name,
    label: category.name,
    ...colorScheme,
    valueFormatter
  }));

  const chartParams = {
    series: [...params],
    height: 250,
    width: windowWidth > 800 ? windowWidth - 32 : 800,
    margin: { top: 10, bottom: 60, left: 40, right: 30 }
  };

  return (
    <div className={getScrollClass(windowWidth)}>
      <div className="flex justify-center decoration-green-500 underline underline-offset-3">
        <h5 className="my-1 font-light cursor-default">
          Доходы за {getCurrentMonthName()}
        </h5>
      </div>
      <BarChart
        dataset={charData}
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
          "--ChartsLegend-rootOffsetX": "0px",
          "--ChartsLegend-rootOffsetY": "30px"
        }}
      />
    </div>
  );
};

IncomeTab.propTypes = {
  user: userPropTypes
};

export default IncomeTab;
