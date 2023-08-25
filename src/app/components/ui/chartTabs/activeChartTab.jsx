import PropTypes from "prop-types";

import { CapitalTab, ChartTab } from "..";
import { QuotesTabComponent } from ".";
import { useState } from "react";

const ActiveChartTab = ({
  user,
  chunkedData,
  actualQuotes,
  activeTab
}) => {
  const [pickedDate, setPickedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setPickedDate(date);
  };

  const renderFirstColTitle = (
    <span className="font-space-mono font-bold">RUB/X</span>
  );

  const renderActiveTab = (activeTab) => {
    switch (activeTab) {
      case "common":
        return (
          <ChartTab
            {...{ user, pickedDate }}
            chartTitle={"Операции за "}
            quotes={actualQuotes}
            type={activeTab}
            onDateChange={handleDateChange}
          />
        );
      case "income":
        return (
          <ChartTab
            {...{ user, pickedDate }}
            chartTitle={"Доходы за "}
            quotes={actualQuotes}
            type={activeTab}
            onDateChange={handleDateChange}
          />
        );
      case "expense":
        return (
          <ChartTab
            {...{ user, pickedDate }}
            chartTitle={"Расходы за "}
            quotes={actualQuotes}
            type={activeTab}
            onDateChange={handleDateChange}
          />
        );
      case "capital":
        return (
          <CapitalTab
            {...{ user, pickedDate }}
            quotes={actualQuotes}
          />
        );
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

ActiveChartTab.propTypes = {
  user: PropTypes.object.isRequired,
  chunkedData: PropTypes.array.isRequired,
  actualQuotes: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired
};

export default ActiveChartTab;
