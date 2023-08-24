import PropTypes from "prop-types";
import { useResizeDetector } from "react-resize-detector";

import { CircularChart, HorizontalBar } from "../../common/chart";
import { SummaryCard, SummaryCardSubtitle } from "../../common/card";
import { chain, find, merge } from "lodash";
import { convertToRub } from "../../../utils";
import ChartLegend from "../../common/legend/chartLegend";

const CapitalTab = ({ user, quotes }) => {
  const { accounts, currencies } = user;
  const {
    width: pieWidth,
    height: pieHeight,
    ref: pieParentRef
  } = useResizeDetector();
  const {
    width: horizWidth,
    ref: horizParentRef
    //
  } = useResizeDetector();

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

  const chartData = chain(accountsInRubEquiv)
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
      <SummaryCard
        title={"Топ 5 доходов/мес"}
        subtitle={
          <SummaryCardSubtitle
            text={"Всего:"}
            value={150000}
            type="income"
          />
        }
        parentRef={pieParentRef}
      >
        <CircularChart
          chartData={chartData}
          categories={chartCategories}
          height={pieHeight}
          width={pieWidth}
        />
        <ChartLegend data={chartCategories} />
      </SummaryCard>

      <SummaryCard
        title={"Личный капитал"}
        subtitle={
          <SummaryCardSubtitle
            value={accountsCapital}
            type="capital"
          />
        }
        parentRef={horizParentRef}
      >
        <HorizontalBar
          containerClass={"pt-4 pb-3"}
          chartData={chartData}
          categories={chartCategories}
          width={horizWidth}
        />
        <ChartLegend data={chartCategories} />
      </SummaryCard>

      <SummaryCard
        title={"Топ 5 расходов/мес"}
        subtitle={
          <SummaryCardSubtitle
            text={"Всего:"}
            value={100000}
            type="expense"
          />
        }
      >
        <CircularChart
          chartData={chartData}
          categories={chartCategories}
          height={pieHeight}
          width={pieWidth}
        />
      </SummaryCard>
    </div>
  );
};

CapitalTab.propTypes = {
  user: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired
};

export default CapitalTab;
