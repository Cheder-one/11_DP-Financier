import PropTypes from "prop-types";
import { useState } from "react";
import { PiCalendarFill } from "react-icons/pi";
import { Col, Form, Row } from "react-bootstrap";
import { filter, find, range, values } from "lodash";

import {
  extractUTCDate,
  countDaysInMonth,
  getMonthName
} from "../../../utils";
import userPropTypes from "../../../types/userPropTypes";
import { DatePicker } from "../../common/form";
import { MixedChart } from "../../common/chart";

/* eslint-disable react/prop-types */

const IncomeTab = ({
  user,
  chartTitle,
  averageLine,
  actualQuotes
}) => {
  const [isAverageEnable, setIsAverageEnable] = useState(averageLine);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { transactions, categories, currencies } = user;

  const selectedMonth = getMonthName(selectedDate);
  const extractedDate = extractUTCDate(selectedDate);

  const handleIsAverageChange = () => {
    setIsAverageEnable((prev) => !prev);
  };
  const handleMonthChange = ({ target }) => {
    setSelectedDate(target.value);
  };

  const daysInMonth = countDaysInMonth();
  const monthDaysArray = range(1, daysInMonth + 1);
  const incomeTransacts = filter(transactions, { type: "income" });
  const categoryNames = categories.map((category) => category.name);

  // Utils
  const defineCategoryName = (id) => {
    const category = find(categories, { id });
    return category.name;
  };
  // Utils
  const getCurrencyData = (id) => {
    const currency = find(currencies, { id });
    return currency;
  };
  // Utils
  const convertToRub = (currencyData, value) => {
    const quotes = actualQuotes.Valute;
    const { code } = currencyData;
    let convertedAmount = 0;

    for (const valuta in quotes) {
      const { CharCode, Value } = quotes[valuta];
      if (code === CharCode) {
        convertedAmount = parseInt(value) * Value;
      }
    }
    return parseInt(convertedAmount);
  };

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

  // Создаем объект для агрегации данных
  const aggregatedData = {};

  // Проходимся по массиву транзакций и группируем данные
  transactsSelectedMonth.forEach((transact) => {
    const transactDay = extractUTCDate(transact.date).day;
    const category = defineCategoryName(transact.category);
    const currency = getCurrencyData(transact.currency);
    const amount = parseInt(transact.amount);

    if (!aggregatedData[transactDay]) {
      aggregatedData[transactDay] = {
        date: transactDay,
        day: `${selectedMonth.name} ${transactDay}`
      };
    }

    if (!aggregatedData[transactDay][category]) {
      aggregatedData[transactDay][category] = 0;
    }

    if (currency.code === "RUB") {
      aggregatedData[transactDay][category] += amount;
    } else {
      const convertedAmount = convertToRub(currency, amount);
      aggregatedData[transactDay][category] += convertedAmount;
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

      <MixedChart
        chartData={chartData}
        categories={categories}
        averageLine={isAverageEnable}
      />
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
  // actualQuotes: PropTypes.object.isRequired
};

export default IncomeTab;
