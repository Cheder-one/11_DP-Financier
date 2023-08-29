import PropTypes from "prop-types";
import { filter, find, map, sortBy, sumBy, toPairs } from "lodash";

import {
  convertToRub,
  getTransactsByMonth,
  transformArrFromPairs,
  transformArrObjToPairs
} from "../../../../utils";
import TopFiveIncome from "./summaryCard/topFiveIncome";
import TopFiveExpense from "./summaryCard/topFiveExpense";
import AccountsCapital from "./summaryCard/accountsCapital";
import { useResizeListener } from "../../../../hooks";

const CapitalTab = ({ user, pickedDate, quotes }) => {
  const [, horizWidth, horizParentRef] = useResizeListener();
  const [pieHeight, pieWidth, pieParentRef] = useResizeListener();
  const { accounts, transactions, categories, currencies } = user;

  // TODO Добавить обновление суммы Топ 5 при транзакциях

  // TODO Конвертировать транзакции в валюту счета, если валюта счета и валюта транзакции расхожи (предлагать курс или делать по текущему)

  // TODO Реализовать возможность редактирования цвета
  // для категории и счета

  const convertDataToRub = (data) => {
    return data.map((item) => {
      const { currency, value } = item;
      const currencyCode = find(currencies, { id: currency }).code;

      return {
        ...item,
        value: convertToRub(value, currencyCode, quotes)
      };
    });
  };

  const transactTypes = ["income", "expense"];
  const accountsInRub = convertDataToRub(accounts);
  const transactsInRub = convertDataToRub(transactions);

  const transactsByType = transactTypes.map((type) => {
    return { [type]: filter(transactsInRub, { type }) };
  }, {});

  const transactsCurMonth = transactsByType.reduce(
    (result, transact) => {
      const [type, transacts] = toPairs(transact)[0];
      const monthTransacts = getTransactsByMonth(
        transacts,
        pickedDate
      );

      result[`${type}Month`] = monthTransacts;
      return result;
    },
    {}
  );
  const { incomeMonth, expenseMonth } = transactsCurMonth;

  const calcCategoryTotal = (monthTransacts, category) => {
    return monthTransacts.reduce((sum, trnct) => {
      if (trnct.category === category) {
        return sum + parseInt(trnct.value);
      }
      return sum;
    }, 0);
  };

  const allCategories = map(categories, "id");

  const getMonthSumEachCategory = (monthTransacts) => {
    const result = allCategories.map((categoryId) => {
      const categoryTotal = calcCategoryTotal(
        monthTransacts,
        categoryId
      );
      const category = find(categories, { id: categoryId });
      return {
        name: category.name,
        value: categoryTotal,
        color: category.color
      };
    });
    return result;
  };

  const incomeCategorsByDesc = sortBy(
    getMonthSumEachCategory(incomeMonth),
    (a) => -a.value
  );
  const expenseCategorsByDesc = sortBy(
    getMonthSumEachCategory(expenseMonth),
    (a) => a.value
  );

  const totalMonthIncome = sumBy(incomeCategorsByDesc, "value");
  const totalMonthExpense = sumBy(expenseCategorsByDesc, "value");

  const calcRestCategorsTotal = (data) => {
    return data.reduce(
      (sum, [, value]) => sum + parseInt(value[1]),
      0
    );
  };

  const incomePairs = transformArrObjToPairs(incomeCategorsByDesc);
  const expensePairs = transformArrObjToPairs(expenseCategorsByDesc);

  const getTopFiveCategories = (type) => {
    const data = type === "income" ? incomePairs : expensePairs;
    const topFive = transformArrFromPairs(data.splice(0, 5));

    const restData = {
      name: "Other",
      value: calcRestCategorsTotal(data),
      color: "#9ca3af"
    };

    if (data.length > 5) {
      return [...topFive, restData];
    } else {
      return topFive;
    }
  };

  const pieChartIncomeData = getTopFiveCategories("income");
  const pieChartExpenseData = getTopFiveCategories("expense");

  return (
    <div className="md:flex md:gap-3 md:px-3 md:pb-3">
      <TopFiveIncome
        chartData={pieChartIncomeData}
        subtitleValue={totalMonthIncome}
        {...{
          pieHeight,
          pieWidth,
          pieParentRef
        }}
      />
      <AccountsCapital
        {...{
          user,
          accountsInRub,
          horizWidth,
          horizParentRef
        }}
      />
      <TopFiveExpense
        chartData={pieChartExpenseData}
        subtitleValue={totalMonthExpense}
        {...{
          pieHeight,
          pieWidth
        }}
      />
    </div>
  );
};

CapitalTab.propTypes = {
  user: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired,
  pickedDate: PropTypes.instanceOf(Date).isRequired
};

export default CapitalTab;
