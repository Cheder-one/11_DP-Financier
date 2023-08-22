import numeral from "numeral";
import PropTypes from "prop-types";
import { useResizeDetector } from "react-resize-detector";

import { HorizontalBar } from "../../common/chart";
import { SummaryCard } from "../../common/card";
import { castArray, find, merge } from "lodash";
import { convertToRub } from "../../../utils";

const data = [
  {
    name: "Счета",
    value1: "10000",
    value2: "5000",
    value3: "70000",
    value4: "30000",
    value5: "20000"
  }
];

const CapitalTab = ({ user, quotes }) => {
  const { accounts, currencies } = user;
  const { width: parentWidth, ref: parentRef } = useResizeDetector();

  // TODO Общий капитал свести к сумме в рублях
  // TODO Балансы счетов оставить в их валюте

  // TODO Реализовать предложение о конвертации валюты, если валюта счета и валюта транзакции расхожи
  // TODO Добавить изменение баланса счета при транзакциях

  // TODO Добавить редактирование цвета для категории и счета

  const accsInRubEquivalent = accounts.map((account) => {
    const { currency, balance } = account;
    const currencyCode = find(currencies, { id: currency }).code;
    return {
      ...account,
      balance: convertToRub(currencyCode, balance, quotes)
    };
  });
  const totalAccountsBalance = accsInRubEquivalent.reduce(
    (sum, n) => sum + parseInt(n.balance),
    0
  );

  const accountsData = accsInRubEquivalent.map((account) => ({
    name: "Счета",
    [account.name]: account.balance
  }));
  const mergedAccsData = castArray(
    accountsData.reduce((result, obj) => merge(result, obj), {})
  );

  const renderCapitalSubtitle = (
    <span className="font-space-mono-bold text-lg text-green-500">
      {numeral(totalAccountsBalance).format("0,0_")}
      <span className="font-bold text-sm"> руб</span>
    </span>
  );

  // key={account.id}
  // dataKey={account.name}
  // unit={account.unit}
  // fill={account.color}

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
            chartData={mergedAccsData}
            categories={[]}
            width={parentWidth}
          />
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
