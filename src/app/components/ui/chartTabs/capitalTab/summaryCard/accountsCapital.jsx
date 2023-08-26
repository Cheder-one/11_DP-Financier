import PropTypes from "prop-types";

import {
  SummaryCard,
  SummaryCardSubtitle
} from "../../../../common/card";
import { HorizontalBar } from "../../../../common/chart";
import ChartLegend from "../../../../common/legend/chartLegend";

const AccountsCapital = ({
  chartData,
  chartCategories,
  accountsCapital,
  horizWidth,
  horizParentRef
}) => {
  return (
    <SummaryCard
      title={"Личный капитал"}
      subtitle={
        <SummaryCardSubtitle value={accountsCapital} type="capital" />
      }
      parentRef={horizParentRef}
    >
      <HorizontalBar
        containerClass={"pt-5 pb-3"}
        chartData={chartData}
        categories={chartCategories}
        width={horizWidth}
      />
      <ChartLegend data={chartCategories} />
    </SummaryCard>
  );
};

AccountsCapital.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartCategories: PropTypes.array.isRequired,
  accountsCapital: PropTypes.number.isRequired,
  horizWidth: PropTypes.number,
  horizParentRef: PropTypes.func.isRequired
};

export default AccountsCapital;
