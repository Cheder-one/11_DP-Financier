import PropTypes from "prop-types";

import { CapitalTab, ChartTab } from "..";
import { QuotesTabComponent } from ".";

const ActiveSummaryTab = ({
  user,
  chunkedData,
  actualQuotes,
  activeTab
}) => {
  const renderFirstColTitle = (
    <span className="font-space-mono font-bold">RUB/X</span>
  );

  const renderActiveTab = (activeTab) => {
    switch (activeTab) {
      case "common":
        return (
          <ChartTab
            user={user}
            chartTitle={"Операции за "}
            quotes={actualQuotes}
            type={activeTab}
          />
        );
      case "income":
        return (
          <ChartTab
            user={user}
            chartTitle={"Доходы за "}
            quotes={actualQuotes}
            type={activeTab}
          />
        );
      case "expense":
        return (
          <ChartTab
            user={user}
            chartTitle={"Расходы за "}
            quotes={actualQuotes}
            type={activeTab}
          />
        );
      case "capital":
        return <CapitalTab user={user} quotes={actualQuotes} />;
      case "quotes":
        return (
          <QuotesTabComponent
            md={[4, 4, 4]}
            chunkedData={chunkedData}
            title={{
              first: renderFirstColTitle,
              second: "Сегодня",
              third: "Вчера"
            }}
          />
        );
    }
  };

  return renderActiveTab(activeTab);
};

ActiveSummaryTab.propTypes = {
  user: PropTypes.object.isRequired,
  chunkedData: PropTypes.array.isRequired,
  actualQuotes: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired
};

export default ActiveSummaryTab;
