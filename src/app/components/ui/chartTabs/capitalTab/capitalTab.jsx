import PropTypes from "prop-types";
import {
  chain,
  filter,
  find,
  fromPairs,
  map,
  merge,
  sortBy,
  sumBy,
  toPairs
} from "lodash";

import { convertToRub, getTransactsByMonth } from "../../../../utils";
import TopFiveIncome from "./summaryCard/topFiveIncome";
import TopFiveExpense from "./summaryCard/topFiveExpense";
import AccountsCapital from "./summaryCard/accountsCapital";
import { useResizeListener } from "../../../../hooks";

const CapitalTab = ({ user, pickedDate, quotes }) => {
  const [, horizWidth, horizParentRef] = useResizeListener();
  const [pieHeight, pieWidth, pieParentRef] = useResizeListener();
  const { accounts, transactions, categories, currencies } = user;

  // TODO Отображать общую сумму в CardSubtitle

  // TODO Отображать значки счетов в Легенде
  // TODO При выборе цвета, менять цвет ведерка

  // TODO Доделать отображение общей суммы за месяц в ChartEndLabel

  // TODO Добавить изменение баланса счета при транзакциях
  // TODO Реализовать предложение о конвертации по текущему или выбранному курсу, если валюта счета и валюта транзакции расхожи
  // TODO Добавить редактирование цвета для категории и счета

  const allCategories = map(categories, "id");

  const findCurrency = (id) => {
    return find(currencies, { id });
  };

  // To Utils
  const convertDataToRub = (data) => {
    return data.map((item) => {
      const { currency, value } = item;
      const currencyCode = findCurrency(currency).code;
      return {
        ...item,
        value: convertToRub(currencyCode, value, quotes)
      };
    });
  };

  const accountsInRub = convertDataToRub(accounts);
  const accountsCapital = accountsInRub.reduce(
    (sum, n) => sum + parseInt(n.value),
    0
  );

  const transactsInRub = convertDataToRub(transactions);
  const transactsByType = ["income", "expense"].map((type) => {
    return { [type]: filter(transactsInRub, { type }) };
  }, {});

  const transactsCurMonth = transactsByType.reduce(
    (result, transactsByType) => {
      const [type, transacts] = toPairs(transactsByType)[0];
      const monthTrncts = getTransactsByMonth(transacts, pickedDate);

      result[`${type}Month`] = monthTrncts;
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

  const totalIncome = sumBy(incomeCategorsByDesc, "value");
  const totalExpense = sumBy(expenseCategorsByDesc, "value");

  // To Utils
  const transformArrObjToPairs = (data) => {
    return data.map((item) => toPairs(item));
  };
  // To Utils
  const transformArrFromPairs = (data) => {
    return data.map((item) => fromPairs(item));
  };
  // To Utils
  const getRestCategorsTotal = (data) => {
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
      value: getRestCategorsTotal(data),
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

  const horizChartData = chain(accountsInRub)
    .map((account) => ({
      [account.name]: account.value
    }))
    .reduce((result, obj) => merge(result, obj), {
      name: "Счета:"
    })
    .castArray()
    .value();

  const horizChartCategors = accounts.map((account) => {
    const { id, name, currency, icon } = account;
    const unit = findCurrency(currency).symbol;

    return { id, name, unit, color: icon.color };
  });

  return (
    <div className="md:flex md:gap-3 md:px-3 md:pb-3">
      <TopFiveIncome
        chartData={pieChartIncomeData}
        subtitleValue={totalIncome}
        {...{
          pieHeight,
          pieWidth,
          pieParentRef
        }}
      />
      <AccountsCapital
        chartData={horizChartData}
        chartCategories={horizChartCategors}
        {...{
          accountsCapital,
          horizWidth,
          horizParentRef
        }}
      />
      <TopFiveExpense
        chartData={pieChartExpenseData}
        subtitleValue={totalExpense}
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
