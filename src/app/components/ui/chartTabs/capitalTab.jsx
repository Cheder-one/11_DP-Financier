import { SummaryCard } from "../../common/card";

const CapitalTab = () => {
  return (
    <div className="px-3 pb-3">
      <div className="flex gap-3">
        <SummaryCard title={"Топ 5 доходов"} />
        <SummaryCard title={"Личный капитал"} />
        <SummaryCard title={"Топ 5 расходов"} />
      </div>
    </div>
  );
};

export default CapitalTab;
