import PropTypes from "prop-types";

import {
  SummaryCard,
  SummaryCardSubtitle
} from "../../../../common/card";
import { CircularChart } from "../../../../common/chart";
import ChartLegend from "../../../../common/legend/chartLegend";

const TopFiveIncome = ({
  chartData,
  subtitleValue,
  pieHeight,
  pieWidth,
  pieParentRef
}) => {
  return (
    <SummaryCard
      title={"Топ 5 доходов/мес"}
      subtitle={
        <SummaryCardSubtitle
          text={"Все:"}
          value={subtitleValue}
          type="income"
        />
      }
      parentRef={pieParentRef}
    >
      <CircularChart
        chartData={chartData}
        height={pieHeight}
        width={pieWidth}
      />
      <ChartLegend data={chartData} />
    </SummaryCard>
  );
};

TopFiveIncome.propTypes = {
  chartData: PropTypes.array.isRequired,
  subtitleValue: PropTypes.number.isRequired,
  pieHeight: PropTypes.number,
  pieWidth: PropTypes.number,
  pieParentRef: PropTypes.func.isRequired
};

export default TopFiveIncome;
