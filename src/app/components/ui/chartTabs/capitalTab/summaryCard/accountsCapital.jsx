import numeral from "numeral";
import PropTypes from "prop-types";
import { chain, find, merge, sortBy } from "lodash";

import {
  SummaryCard,
  SummaryCardSubtitle
} from "../../../../common/card";
import { HorizontalBar } from "../../../../common/chart";
import ChartLegend from "../../../../common/legend/chartLegend";
import { transformArrObjToPairs } from "../../../../../utils";

const AccountsCapital = ({
  user,
  accountsInRub,
  horizWidth,
  horizParentRef
}) => {
  const { accounts, currencies } = user;

  const accountsCapital = accountsInRub.reduce(
    (sum, n) => sum + parseInt(n.value),
    0
  );

  const accountsRubAsc = sortBy(accountsInRub, (a) => a.value);

  const chartCategories = accountsRubAsc.map((account) => {
    const { id, name, currency, icon } = account;
    const { symbol: unit } = find(currencies, { id: currency });

    return { id, name, unit, icon: icon.name, color: icon.color };
  });

  const getFormattedData = (data) => {
    return chain(data)
      .map((account) => ({
        [account.name]: account.value
      }))
      .reduce((result, obj) => merge(result, obj), {})
      .castArray()
      .value();
  };

  const chartRubEquivData = getFormattedData(accountsInRub);
  const tooltipInitData = getFormattedData(accounts);

  const tooltipFormatter = (value, name, props, i) => {
    const data = transformArrObjToPairs(tooltipInitData);
    value = data.flat()[i][1];

    return `${numeral(value).format("0,0")} `;
  };

  return (
    <SummaryCard
      title={"Личный капитал"}
      subtitle={
        <SummaryCardSubtitle value={accountsCapital} type="capital" />
      }
      parentRef={horizParentRef}
    >
      <div className="pt-4 pb-3">
        <div className="font-light pl-3 pb-3">Пропорции счетов:</div>
        <HorizontalBar
          chartData={chartRubEquivData}
          categories={chartCategories}
          width={horizWidth}
          formatter={tooltipFormatter}
        />
      </div>
      <ChartLegend data={chartCategories} />
    </SummaryCard>
  );
};

AccountsCapital.propTypes = {
  user: PropTypes.object.isRequired,
  accountsInRub: PropTypes.array.isRequired,
  horizWidth: PropTypes.number,
  horizParentRef: PropTypes.func.isRequired
};

export default AccountsCapital;
