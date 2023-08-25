import PropTypes from "prop-types";

import {
  SummaryCard,
  SummaryCardSubtitle
} from "../../../../common/card";
import { CircularChart } from "../../../../common/chart";
import ChartLegend from "../../../../common/legend/chartLegend";

const TopFiveExpense = ({
  chartData,
  chartCategories,
  pieHeight,
  pieWidth
}) => {
  return (
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
      <ChartLegend data={chartCategories} />
    </SummaryCard>
  );
};

TopFiveExpense.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartCategories: PropTypes.array.isRequired,
  pieHeight: PropTypes.number,
  pieWidth: PropTypes.number,
  pieParentRef: PropTypes.func
};

export default TopFiveExpense;
