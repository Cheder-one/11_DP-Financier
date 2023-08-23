import { useState } from "react";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";
import { chunk, isEmpty, pick, values } from "lodash";

import { useActualQuotes } from "../hooks";
import { getExchangeRateClass } from "../utils";
import { ActiveSummaryTab } from "../components/ui/chartTabs";
import { Spinner } from "../components/ui";

const FinanceSummary = ({ user }) => {
  const { currencies } = user;
  const actualQuotes = useActualQuotes();
  const [activeTab, setActiveTab] = useState("common");

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const userExchangeRates = values(
    pick(
      actualQuotes.Valute,
      currencies.map((cur) => cur.code)
    )
  );

  const tableData = userExchangeRates.map((exchRate) => {
    let { ID, CharCode, Value, Previous } = exchRate;
    Value = Value.toFixed(2);
    Previous = Previous.toFixed(2);

    const renderSecondCol = (
      <span className={getExchangeRateClass(Value, Previous)}>
        {Value}
      </span>
    );
    return {
      id: ID,
      firstCol: CharCode,
      secondCol: renderSecondCol,
      thirdCol: Previous
    };
  });

  const chunkedTableData = chunk(tableData, tableData.length / 2);

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
        <Nav.Item className="ml-auto">
          <Nav.Link eventKey="quotes">Котировки</Nav.Link>
        </Nav.Item>
      </Nav>

      {!isEmpty(actualQuotes) ? (
        <div className="mt-3">
          {
            <ActiveSummaryTab
              user={user}
              chunkedData={chunkedTableData}
              actualQuotes={actualQuotes}
              activeTab={activeTab}
            />
          }
        </div>
      ) : (
        <Spinner className="flex justify-center items-center h-30vh" />
      )}
    </div>
  );
};

FinanceSummary.propTypes = {
  user: PropTypes.object.isRequired
};

export default FinanceSummary;
