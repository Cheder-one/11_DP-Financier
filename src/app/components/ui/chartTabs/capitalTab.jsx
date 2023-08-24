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

  // TODO Добавить редактирование цвета для категории и счета
  // TODO Реализовать Топ 5 в виде PieChart

  // TODO Добавить кнопку функций для карточки

  // TODO Добавить изменение баланса счета при транзакциях
  // TODO Реализовать предложение о конвертации по текущему или выбранному курсу, если валюта счета и валюта транзакции расхожи

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

  const data = [{ label: "Сбербанк" }, { label: "Альфа-банк" }];
  const colors = ["blue", "green", "red"];

  return (
    <div className="px-3 pb-3">
      <div className="flex gap-3">
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
            containerClass={"pt-0.5"}
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
          Content
        </SummaryCard>
      </div>
    </div>
  );
};

CapitalTab.propTypes = {
  user: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired
};

export default CapitalTab;
