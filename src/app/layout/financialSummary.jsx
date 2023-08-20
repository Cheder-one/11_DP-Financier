// eslint-disable-next-line
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { CapitalTab, ExpenseTab, IncomeTab } from "../components/ui";
import userPropTypes from "../types/userPropTypes";
import { getActualQuotes } from "../utils";

const FinancialSummary = ({ user }) => {
  const [actualQuotes, setActualQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState("income");

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  const fetchActualQuotes = async () => {
    const actualQuotes = await getActualQuotes();
    setActualQuotes(actualQuotes);
  };
  useEffect(() => {
    fetchActualQuotes();
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "income":
        return (
          <IncomeTab
            user={user}
            chartTitle={"Доходы за "}
            actualQuotes={actualQuotes}
          />
        );
      case "expense":
        return <ExpenseTab user={user} />;
      case "capital":
        return <CapitalTab user={user} />;
    }
  };

  return (
    <div className=" border rounded">
      <Nav
        variant="tabs"
        defaultActiveKey="income"
        onSelect={handleSelect}
      >
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

FinancialSummary.propTypes = {
  user: userPropTypes
};

export default FinancialSummary;
