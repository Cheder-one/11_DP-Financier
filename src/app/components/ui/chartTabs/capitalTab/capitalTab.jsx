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

  // FIXME Суммы категорий приходят в разных currencies

  // TODO Добавить изменение баланса счета при транзакциях
  // TODO Реализовать предложение о конвертации по текущему или выбранному курсу, если валюта счета и валюта транзакции расхожи
  // TODO Добавить редактирование цвета для категории и счета

  const allCategories = map(categories, "id");

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

  // const transactsInRubEquiv = transactions.map((transacts) => {
  //   const { currency, amount } = transacts;
  //   const currencyCode = findCurrency(currency).code;
  //   return {
  //     ...transacts,
  //     balance: convertToRub(currencyCode, balance, quotes)
  //   };
  // });

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
    const result = allCategories.map((categoryId) => {
      const value = calcSumSameCategory(monthTransacts, categoryId);
      const category = find(categories, { id: categoryId });

      return { name: category.name, value, color: category.color };
    });
    return result;
  };

  const monthlyIncomeCategors = getMonthSumByCategory(monthIncome);
  const monthlyExpenseCategors = getMonthSumByCategory(monthExpense);

  const incomeCategorsByDesc = sortBy(
    monthlyIncomeCategors,
    (a) => -a.value
  );
  const expenseCategorsByDesc = sortBy(
    monthlyExpenseCategors,
    (a) => a.value
  );

  // const data = [
  //   { name: "Сбербанк", value: 90000, color: "#82ca9d" },
  //   { name: "Альфа-банк", value: 7576935, color: "#FF6F61" },
  //   { name: "ВТБ", value: 500000, color: "#8884d8" },
  //   { name: "Газпромбанк", value: 300000, color: "#83a6ed" },
  //   { name: "Тинькофф", value: 2500000, color: "#8dd1e1" },
  //   { name: "Росбанк", value: 1500000, color: "#ffc658" },
  //   { name: "Райффайзенбанк", value: 800000, color: "#ff9e3d" },
  //   { name: "Совкомбанк", value: 450000, color: "#a6d854" },
  //   { name: "ЮниКредит Банк", value: 620000, color: "#d8b83f" },
  //   { name: "Открытие", value: 180000, color: "#8c564b" }
  // ];

  const IncomePairs = incomeCategorsByDesc.map((item) => {
    return toPairs(item);
  });

  const getRest = (data) => {
    return data.reduce(
      (sum, [, value]) => sum + parseInt(value[1]),
      0
    );
  };

  // TODO Добавлять Other если только длинна > 5

  const topIncome = IncomePairs.splice(0, 5);
  const restIncome = {
    name: "Other",
    value: getRest(IncomePairs),
    color: "#9ca3af"
  };

  const IncomeObj = topIncome.map((item) => {
    return fromPairs(item);
  });

  const topFiveNRestIncomes = concat(IncomeObj, restIncome);

  const getTopFiveCategories = (type) => {
    const income = incomeCategorsByDesc;
    const expense = expenseCategorsByDesc;

    const getRest = (data) => {
      return data.reduce(
        (sum, [, value]) => sum + parseInt(value[1]),
        0
      );
    };

    // return type === "income"
    //   ? concat(income.splice(0, 5), [["Other", getRest(income)]])
    //   : concat(expense.splice(0, 5), [["Other", getRest(expense)]]);
  };

  const topFiveIncome = fromPairs(getTopFiveCategories("income"));
  const topFiveExpense = fromPairs(getTopFiveCategories("expense"));

  const pieChartData = accountsInRubEquiv.map((item) => {
    const { name, balance, icon } = item;
    return {
      name,
      value: parseInt(balance),
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
        chartData={topFiveNRestIncomes}
        {...{
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
