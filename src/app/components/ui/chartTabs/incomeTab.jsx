import PropTypes from "prop-types";
import { filter, isEmpty, pick, range } from "lodash";
import { PiCalendarFill } from "react-icons/pi";
import {
  Area,
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import {
  dataConstants,
  extractUTCDate,
  countDaysInMonth,
  getMonthName,
  useWindowInnerWidth
} from "../../../utils";
import { DatePicker, DropdownComponent } from "../../common/form";
import userPropTypes from "../../../types/userPropTypes";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const { MONTHS } = dataConstants;

// Генерация случайного числа в заданном диапазоне
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Move to Utils
const getScrollClass = (windowWidth) => {
  return windowWidth > 800 ? "" : "overflow-scroll";
};

const currentMonth = getMonthName();

const IncomeTab = ({ user, chartTitle, averageLine }) => {
  const [isAverageEnable, setIsAverageEnable] = useState(averageLine);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [windowWidth] = useWindowInnerWidth();
  const { transactions, categories, currencies } = user;

  const selectedMonth = getMonthName(selectedDate);
  const extractedDate = extractUTCDate(selectedDate);

  const handleIsAverageChange = () => {
    setIsAverageEnable((prev) => !prev);
  };

  // Генерация данных
  const generateData = () => {
    const data = [];
    for (let day = 1; day <= 30; day++) {
      const products = getRandomValue(50, 200);
      const transport = getRandomValue(20, 100);
      const housing = getRandomValue(100, 500);
      const rest = getRandomValue(10, 150);
      const health = getRandomValue(5, 50);
      const items = [products, transport, housing, rest, health];
      const average = items.reduce((a, b) => a + b, 0) / items.length;

      data.push({
        date: day,
        day: `${selectedMonth.name} ${day}`,
        products,
        transport,
        housing,
        rest,
        health,
        average
      });
    }
    return data;
  };

  const data = generateData();

  const handleMonthChange = ({ target }) => {
    setSelectedDate(target.value);
  };

  const daysInMonth = countDaysInMonth();
  const halfOfMonth = Math.floor(daysInMonth / 2);
  const monthDaysArray = range(1, daysInMonth + 1);

  const incomeTransacts = filter(transactions, { type: "income" });

  const transactsSelectedMonth = incomeTransacts.filter(
    (transact) => {
      const transactDate = extractUTCDate(transact.date);
      return (
        transactDate.month === extractedDate.month &&
        transactDate.year === extractedDate.year
      );
    }
  );

  const chartData = monthDaysArray.map((day) => {
    let transactionForDay = transactsSelectedMonth.find(
      (transact) => {
        const transactionDay = extractUTCDate(transact.date).day;
        return transactionDay === day;
      }
    );

    const desiredKeys = ["amount", "category", "currency"];
    const pickedKeys = pick(transactionForDay, desiredKeys);

    transactionForDay = {
      [pickedKeys.category]: pickedKeys.amount
    };

    return {
      date: day,
      day: `${selectedMonth.name} ${day}`,
      ...(!isEmpty(transactionForDay) ? transactionForDay : [])
    };
  });

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

  const getCategoryName = (id) => {
    const category = find(categories, { id });
    return category.name;
  };
  const getCurrencyName = (id) => {
    const currency = find(currencies, { id });
    return currency.code;
  };

  const ChartComponent = isAverageEnable ? ComposedChart : BarChart;

  return (
    <div className={getScrollClass(windowWidth)}>
      <Row>
        <Col xs={{ offset: 3, span: 6 }}>
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
          xs={{ span: 3 }}
          className="flex justify-center items-center"
        >
          <Form.Check
            id="average-line"
            type="switch"
            label="AverageLine"
            onClick={handleIsAverageChange}
          />
        </Col>
      </Row>

      <ChartComponent
        barGap={1}
        // barSize={5}
        barCategoryGap={5}
        height={300}
        width={windowWidth - 32}
        data={data}
        margin={{
          top: 10,
          bottom: 10,
          left: 0,
          right: 50
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" scale="auto" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Brush
          height={25}
          dataKey="date"
          stroke="#3b82f6"
          startIndex={halfOfMonth}
        />

        {categories.map((category) => (
          <Bar
            key={category.id}
            dataKey={category.name}
            fill={category.color || "#82ca9d"}
          />
        ))}
        <Bar dataKey="transport" fill="#0074D9" />
        <Bar dataKey="housing" fill="#2ECC40" />
        <Bar dataKey="rest" fill="#FFDC00" />
        <Bar dataKey="health" fill="#B10DC9" />
        {isAverageEnable && (
          <Area
            type="monotone"
            dataKey="average"
            fill="#8884d8"
            stroke="#ff7300"
          />
        )}
      </ChartComponent>
    </div>
  );
};

IncomeTab.defaultProps = {
  //
};

IncomeTab.propTypes = {
  user: userPropTypes
};

export default IncomeTab;
