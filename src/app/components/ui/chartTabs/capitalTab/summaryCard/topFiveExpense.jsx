import PropTypes from "prop-types";

import {
  SummaryCard,
  SummaryCardSubtitle
} from "../../../../common/card";
import {
  CircularChart,
  CustomTooltipPieChart
} from "../../../../common/chart";
import ChartLegend from "../../../../common/legend/chartLegend";
import { Tooltip } from "recharts";

const TopFiveExpense = ({
  chartData,
  subtitleValue,
  pieHeight,
  pieWidth
}) => {
  const renderTooltip = (
    <Tooltip
      content={<CustomTooltipPieChart negativeValue={true} />}
    />
  );

  return (
    <SummaryCard
      title={"Топ 5 расходов/мес"}
      subtitle={
        <SummaryCardSubtitle
          text={"Все:"}
          value={subtitleValue}
          type="expense"
        />
      }
    >
      <CircularChart
        chartData={chartData}
        height={pieHeight}
        width={pieWidth}
        tooltip={renderTooltip}
      />
      <ChartLegend data={chartData} />
    </SummaryCard>
  );
};

TopFiveExpense.propTypes = {
  chartData: PropTypes.array.isRequired,
  subtitleValue: PropTypes.number.isRequired,
  pieHeight: PropTypes.number,
  pieWidth: PropTypes.number,
  pieParentRef: PropTypes.func
};

export default TopFiveExpense;
