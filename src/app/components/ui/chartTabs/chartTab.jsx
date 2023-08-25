import PropTypes from "prop-types";
import { useState } from "react";
import { PiCalendarFill } from "react-icons/pi";
import { Col, Form, Row } from "react-bootstrap";
import { filter, find, range, values } from "lodash";

import {
  extractUTCDate,
  countDaysInMonth,
  getMonthName,
  convertToRub,
  getChartTitleClass,
  getTransactsByMonth
} from "../../../utils";
import { DatePicker } from "../../common/form";
import { MixedChart } from "../../common/chart";
import { useLocalStorage } from "../../../hooks";

const ChartTab = ({
  user,
  chartTitle,
  averageLine,
  pickedDate,
  // eslint-disable-next-line
  quotes,
  type,
  onDateChange
}) => {
  const { transactions, categories, currencies } = user;
  const [isAverage, setIsAverage] = useLocalStorage({ averageLine });

  const daysInMonth = countDaysInMonth();
  const selectedMonth = getMonthName(pickedDate);
  const monthDaysArray = range(1, daysInMonth + 1);
  const categoryNames = categories.map((category) => category.name);
  // prettier-ignore
  const transactsByType = type === "common"
    ? transactions
    : filter(transactions, { type });

  const toggleAverageLine = () => {
    setIsAverage((prev) => !prev);
  };

  const handleMonthChange = ({ target }) => {
    onDateChange(target.value);
  };

  const transactsSelectedMonth = getTransactsByMonth(
    transactsByType,
    pickedDate
  );

  // Создаем объект для агрегации данных
  const aggregatedData = {};

  // Проходимся по массиву транзакций и группируем данные
  transactsSelectedMonth.forEach((transact) => {
    const transactDay = extractUTCDate(transact.date).day;
    const category = find(categories, { id: transact.category });
    const currency = find(currencies, { id: transact.currency });
    const amount = parseInt(transact.amount);
    const { code: currCode } = currency;

    if (!aggregatedData[transactDay]) {
      aggregatedData[transactDay] = {
        date: transactDay,
        day: `${selectedMonth.name} ${transactDay}`
      };
    }

    if (!aggregatedData[transactDay][category.name]) {
      aggregatedData[transactDay][category.name] = 0;
    }

    if (currCode === "RUB") {
      aggregatedData[transactDay][category.name] += amount;
    } else {
      const convertedAmount = convertToRub(currCode, amount, quotes);
      aggregatedData[transactDay][category.name] += convertedAmount;
    }
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

  return (
    <>
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
          <div className={getChartTitleClass(type)}>
            <h5 className="mb-2 font-light cursor-default pr-1">
              {chartTitle}
            </h5>
            <DatePicker
              name={"date"}
              value={pickedDate}
              showIcon={false}
              isMonthYearPicker={true}
              onChange={handleMonthChange}
            >
              <div
                className={
                  getChartTitleClass(type) + " cursor-pointer "
                }
              >
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
            defaultChecked={isAverage}
            onClick={toggleAverageLine}
          />
        </Col>
      </Row>

      <MixedChart
        chartData={chartData}
        categories={categories}
        averageLine={isAverage}
      />
    </>
  );
};

ChartTab.defaultProps = {
  averageLine: true
};

ChartTab.propTypes = {
  user: PropTypes.object.isRequired,
  chartTitle: PropTypes.string,
  averageLine: PropTypes.bool,
  // quotes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default ChartTab;
