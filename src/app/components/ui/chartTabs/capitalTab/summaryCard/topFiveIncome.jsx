import PropTypes from "prop-types";

import {
  SummaryCard,
  SummaryCardSubtitle
} from "../../../../common/card";
import { CircularChart } from "../../../../common/chart";
import ChartLegend from "../../../../common/legend/chartLegend";

const TopFiveIncome = ({
  chartData,
  chartCategories,
  pieHeight,
  pieWidth,
  pieParentRef
}) => {
  return (
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
  );
};

TopFiveIncome.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartCategories: PropTypes.array.isRequired,
  pieHeight: PropTypes.number,
  pieWidth: PropTypes.number,
  pieParentRef: PropTypes.func.isRequired
};

export default TopFiveIncome;
