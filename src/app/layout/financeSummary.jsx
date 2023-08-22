// eslint-disable-next-line
import PropTypes from "prop-types";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { CapitalTab, ChartTab } from "../components/ui";
import { useActualQuotes } from "../hooks";

const FinanceSummary = ({ user }) => {
  const actualQuotes = useActualQuotes();
  const [activeTab, setActiveTab] = useState("common");

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const renderActiveTab = () => {
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
    }
  };

  return (
    <div className="border rounded">
      <Nav
        className="bg-gray-50"
        variant="tabs"
        defaultActiveKey="common"
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link eventKey="common">Общее</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="income">Доходы</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="expense">Расходы</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="capital">Капитал</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="mt-3">{renderActiveTab()}</div>
    </div>
  );
};

FinanceSummary.propTypes = {
  user: PropTypes.object.isRequired
};

export default FinanceSummary;
