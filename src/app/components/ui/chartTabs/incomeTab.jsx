import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PiCalendarFill } from "react-icons/pi";
import { Col, Form, Row } from "react-bootstrap";
import { filter, find, range, values } from "lodash";
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
  extractUTCDate,
  countDaysInMonth,
  getMonthName,
  useWindowInnerWidth,
  getActualQuotes
} from "../../../utils";
import { DatePicker } from "../../common/form";
import userPropTypes from "../../../types/userPropTypes";
import axios from "axios";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border rounded bg-white px-2 pt-2">
        <p className="label">{`Дата: ${label}`}</p>
        {payload.map((data) => {
          const categoryColor =
            data.dataKey === "avg" ? data.stroke : data.fill;

          return (
            <p
              key={data.dataKey}
              className="intro"
              style={{ color: categoryColor }}
            >
              {`${data.name} : ${data.value} ${data.unit}`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};
const IncomeTab = ({ user, chartTitle, averageLine, quotes }) => {
  const [windowWidth] = useWindowInnerWidth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAverageEnable, setIsAverageEnable] = useState(averageLine);
  const { transactions, categories, currencies } = user;

  const selectedMonth = getMonthName(selectedDate);
  const extractedDate = extractUTCDate(selectedDate);
  console.log(quotes);

  const handleIsAverageChange = () => {
    setIsAverageEnable((prev) => !prev);
  };
  const handleMonthChange = ({ target }) => {
    setSelectedDate(target.value);
  };

  const daysInMonth = countDaysInMonth();
  const monthDaysArray = range(1, daysInMonth + 1);
  const incomeTransacts = filter(transactions, { type: "income" });

  // Okay
  const transactsSelectedMonth = incomeTransacts.filter(
    (transact) => {
      const transactDate = extractUTCDate(transact.date);
      return (
        transactDate.month === extractedDate.month &&
        transactDate.year === extractedDate.year
      );
    }
  );

  const defineCategoryName = (id) => {
    const category = find(categories, { id });
    return category.name;
  };
  const defineCurrencyName = (id) => {
    const currency = find(currencies, { id });
    return currency.code;
  };

  const categoryNames = categories.map((category) => category.name);

  // Создаем объект для агрегации данных
  const aggregatedData = {};

  // Проходимся по массиву транзакций и группируем данные
  transactsSelectedMonth.forEach((transact) => {
    const transactDay = extractUTCDate(transact.date).day;
    const category = defineCategoryName(transact.category);

    if (!aggregatedData[transactDay]) {
      aggregatedData[transactDay] = {
        date: transactDay,
        day: `${selectedMonth.name} ${transactDay}`
      };
    }

    if (!aggregatedData[transactDay][category]) {
      aggregatedData[transactDay][category] = 0;
    }

    aggregatedData[transactDay][category] += parseInt(
      transact.amount
    );
  });

  // После агрегации, добавляем пустые значения для дней, в которых нет транзакций
  monthDaysArray.forEach((day) => {
    if (!aggregatedData[day]) {
      aggregatedData[day] = {
        date: day,
        day: `${selectedMonth.name} ${day}`
      };
    }
  });

  // Преобразуем объект агрегированных данных в массив
  const chartData = values(aggregatedData);

  // Добавляем среднее значение трат за день
  const average = {};
  chartData.forEach((transactDayData) => {
    for (const key in transactDayData) {
      const keyVal = transactDayData[key];

      if (!average[transactDayData.day]) {
        average[transactDayData.day] = 0;
      }

      for (const name of categoryNames) {
        if (name === key) {
          average[transactDayData.day] += parseInt(keyVal);
        }
      }
    }
    transactDayData.avg = average[transactDayData.day] / 2;
  });

  console.log(chartData);

  // [
  //   {
  //     date: day,
  //     day: `${selectedMonth.name} ${day}`,
  //     products: 181,
  //     transport: 41,
  //     housing: 384,
  //     rest: 53,
  //     health: 8
  //   }
  // ]

  const ChartComponent = isAverageEnable ? ComposedChart : BarChart;

  return (
    <>
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
          <div className="flex justify-center items-center decoration-green-500 underline underline-offset-3">
            <h5 className="mb-2 font-light cursor-default pr-1">
              {chartTitle}
            </h5>
            <DatePicker
              name={"date"}
              value={selectedDate}
              showIcon={false}
              isMonthYearPicker={true}
              onChange={handleMonthChange}
            >
              <div className="flex justify-center items-center decoration-green-500 underline underline-offset-3 cursor-pointer ">
                <h5 className="font-light select-none">
                  {selectedMonth.name}
                </h5>
                <PiCalendarFill
                  size={30}
                  className="ml-1 mb-0.5 border rounded p-1"
                />
              </div>
            </DatePicker>
          </div>
        </Col>

        <Col
          md={{ span: 3 }}
          className="flex justify-center items-center"
        >
          <Form.Check
            id="average-line"
            type="switch"
            label="AverageLine"
            defaultChecked
            onClick={handleIsAverageChange}
          />
        </Col>
      </Row>

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
        {isAverageEnable && (
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
    </>
  );
};

IncomeTab.defaultProps = {
  averageLine: true
};

IncomeTab.propTypes = {
  user: userPropTypes,
  chartTitle: PropTypes.string,
  averageLine: PropTypes.bool
};

export default IncomeTab;
