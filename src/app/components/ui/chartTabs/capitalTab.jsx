import numeral from "numeral";
import PropTypes from "prop-types";
import { useResizeDetector } from "react-resize-detector";

import { HorizontalBar } from "../../common/chart";
import { SummaryCard } from "../../common/card";
import { chain, find, merge } from "lodash";
import { convertToRub } from "../../../utils";
import ChartLegend from "../../common/legend/chartLegend";

const CapitalTab = ({ user, quotes }) => {
  const { accounts, currencies } = user;
  const { width: parentWidth, ref: parentRef } = useResizeDetector();

  // TODO Добавить сноску с курсами валют

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

  const renderCapitalSubtitle = (
    <span className="font-space-mono font-bold text-lg text-green-500">
      {numeral(accountsCapital).format("0,0_")}
      <span className="font-bold text-sm"> руб</span>
    </span>
  );

  const data = [{ label: "Сбербанк" }, { label: "Альфа-банк" }];
  const colors = ["blue", "green", "red"];

  return (
    <div className="px-3 pb-3">
      <div className="flex gap-3">
        <SummaryCard title={"Топ 5 доходов"} />

        <SummaryCard
          title={"Личный капитал"}
          subtitle={renderCapitalSubtitle}
          parentRef={parentRef}
        >
          <HorizontalBar
            chartData={chartData}
            categories={chartCategories}
            width={parentWidth}
          />

          <ChartLegend {...{ data, colors }} />
        </SummaryCard>

        <SummaryCard title={"Топ 5 расходов"} />
      </div>
    </div>
  );
};

CapitalTab.propTypes = {
  user: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired
};

export default CapitalTab;
