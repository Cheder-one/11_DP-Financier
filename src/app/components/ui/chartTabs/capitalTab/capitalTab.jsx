import PropTypes from "prop-types";
import {
  chain,
  concat,
  filter,
  find,
  fromPairs,
  map,
  merge,
  sortBy,
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

  const allCategories = map(categories, "id");

  // TODO Реализовать получение реальных данных в PieChart

  // TODO Добавить изменение баланса счета при транзакциях
  // TODO Реализовать предложение о конвертации по текущему или выбранному курсу, если валюта счета и валюта транзакции расхожи

  // TODO Добавить редактирование цвета для категории и счета

  const findCurrency = (id) => {
    return find(currencies, { id });
  };

  const accountsInRubEquiv = accounts.map((account) => {
    const { currency, balance } = account;
    const currencyCode = findCurrency(currency).code;
    return {
      ...account,
      balance: convertToRub(currencyCode, balance, quotes)
    };
  });

  const accountsCapital = accountsInRubEquiv.reduce(
    (sum, n) => sum + parseInt(n.balance),
    0
  );

  // TODO
  // 1) Привести данные к нужному формату
  // 2) Передать Other categories

  // const data = [
  //   { name: "Продукты", value: 400, color: "#0088FE" },
  //   { name: "Такси ", value: 300, color: "#00C49F" },
  //   { name: "Кофе", value: 300, color: "#FFBB28" },
  //   { name: "Транспорт ", value: 200, color: "#FF8042" },
  //   { name: "Жилье ", value: 500, color: "#A83279" },
  //   { name: "Other", value: 1000, color: "#5F5A8D" }
  // ];

  const transactsByType = ["income", "expense"].map((type) => {
    return { [type]: filter(transactions, { type }) };
  }, {});

  const transactsCurMonth = transactsByType.reduce(
    (result, trsByType) => {
      const [type, transacts] = toPairs(trsByType)[0];
      result[type] = getTransactsByMonth(transacts, pickedDate);
      return result;
    },
    {}
  );

  // prettier-ignore
  const {
    income: monthIncome,
    expense: monthExpense
  } = transactsCurMonth;

  const calcSumSameCategory = (monthTransacts, category) => {
    return monthTransacts.reduce((sum, trnct) => {
      if (trnct.category === category) {
        return sum + parseInt(trnct.amount);
      }
      return sum;
    }, 0);
  };

  const getMonthSumByCategory = (monthTransacts) => {
    return allCategories.reduce((result, category) => {
      const categoryName = find(categories, { id: category }).name;

      result[categoryName] = calcSumSameCategory(
        monthTransacts,
        category
      );
      return result;
    }, {});
  };

  const categoriesMonthIncome = getMonthSumByCategory(monthIncome);
  const categoriesMonthExpense = getMonthSumByCategory(monthExpense);

  const incomeCategorsByDesc = sortBy(
    toPairs(categoriesMonthIncome),
    ([, a]) => -a
  );
  const expenseCategorsByDesc = sortBy(
    toPairs(categoriesMonthExpense),
    ([, a]) => a
  );

  const getTopFiveCategories = (type) => {
    const income = incomeCategorsByDesc;
    const expense = expenseCategorsByDesc;

    const getRest = (data) => {
      return data.reduce((sum, [, n]) => sum + parseInt(n), 0);
    };

    return type === "income"
      ? concat(income.splice(0, 5), [["Other", getRest(income)]])
      : concat(expense.splice(0, 5), [["Other", getRest(expense)]]);
  };

  const topFiveIncome = fromPairs(getTopFiveCategories("income"));
  const topFiveExpense = fromPairs(getTopFiveCategories("expense"));

  const pieChartData = accountsInRubEquiv.map((item) => {
    const { name, balance, icon } = item;
    return {
      name,
      balance,
      color: icon.color
    };
  });

  const horizChartData = chain(accountsInRubEquiv)
    .map((account) => ({
      [account.name]: account.balance
    }))
    .reduce((result, obj) => merge(result, obj), {
      name: "Счета:"
    })
    .castArray()
    .value();

  const chartCategories = accounts.map((account) => {
    const { id, name, currency, icon } = account;
    const unit = findCurrency(currency).symbol;

    return { id, name, unit, color: icon.color };
  });

  return (
    <div className="md:flex md:gap-3 md:px-3 md:pb-3">
      <TopFiveIncome
        chartData={pieChartData}
        {...{
          chartCategories,
          pieHeight,
          pieWidth,
          pieParentRef
        }}
      />
      <AccountsCapital
        chartData={horizChartData}
        {...{
          chartCategories,
          accountsCapital,
          horizWidth,
          horizParentRef
        }}
      />
      <TopFiveExpense
        chartData={pieChartData}
        {...{
          chartCategories,
          pieHeight,
          pieWidth
        }}
      />
    </div>
  );
};

CapitalTab.propTypes = {
  user: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired
};

export default CapitalTab;
