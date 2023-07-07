import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import Loader from "../ui/spinner";
import ListCard from "../common/card/ListCard";
import Dropdown from "../common/form/dropdown";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  useEffect(() => {
    if (selectedAccount) {
      const selectedAccountTransactions = filter(
        user.transactions,
        (transaction) => transaction.account === selectedAccount.id
      );

      const uniqueDates = uniqBy(
        selectedAccountTransactions,
        (transaction) => transaction.date
      ).map((transaction) => transaction.date);

      setSelectedDate(null);
      setSelectedDate(uniqueDates[0]);
    }
  }, [user.transactions, selectedAccount]);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDropdownSelect = (eventKey, type) => {
    if (type === "account") {
      const selectedAccount = JSON.parse(JSON.stringify(eventKey));
      handleAccountSelect(selectedAccount);
    } else if (type === "income" || type === "expense") {
      const selectedDate = JSON.parse(JSON.stringify(eventKey));
      handleDateSelect(selectedDate);
    }
  };

  const dropDownIncome = (
    <Dropdown
      items={getUniqueDates("income")}
      type="income"
      onSelect={(eventKey) => handleDropdownSelect(eventKey, "income")}
    />
  );

  const dropDownAccount = (
    <Dropdown
      items={user.accounts}
      type="account"
      onSelect={(eventKey) => handleDropdownSelect(eventKey, "account")}
    />
  );

  const dropDownExpense = (
    <Dropdown
      items={getUniqueDates("expense")}
      type="expense"
      onSelect={(eventKey) => handleDropdownSelect(eventKey, "expense")}
    />
  );

  const addButton = "+";
  const delButton = "-";

  function getUniqueDates(type) {
    if (selectedAccount) {
      const transactions = filter(
        user.transactions,
        (transaction) => transaction.account === selectedAccount.id
      );
      const uniqueDates = uniqBy(
        transactions,
        (transaction) => transaction.date
      );
      return uniqueDates.map((transaction) => ({
        id: transaction.date,
        type,
        name: transaction.date
      }));
    }
    return [];
  }

  const filterTransactions = (type) => {
    if (selectedAccount) {
      const transactions = filter(
        user.transactions,
        (transaction) => transaction.account === selectedAccount.id
      );

      if (selectedDate) {
        const filteredTransactions = filter(
          transactions,
          (transaction) =>
            (type === "income" && transaction.amount > 0) ||
            (type === "expense" && transaction.amount < 0)
        );

        return filter(
          filteredTransactions,
          (transaction) => transaction.date === selectedDate
        );
      }

      return filter(
        transactions,
        (transaction) =>
          (type === "income" && transaction.amount > 0) ||
          (type === "expense" && transaction.amount < 0)
      );
    }

    return [];
  };

  return (
    <>
      {keys(user || []).length > 0 ? (
        <div className="mx-4">
          <Row style={{ marginTop: "3%" }}>
            <Col md="4">
              <ListCard
                title={{
                  first: "Доход",
                  second: dropDownIncome,
                  third: addButton
                }}
                type="income"
                route="/"
                bodyList={filterTransactions("income")}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>
            <Col md="4">
              <ListCard
                title={{
                  first: "Счет",
                  second: dropDownAccount,
                  third: addButton
                }}
                type="account"
                bodyList={filterTransactions("account")}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>
            <Col md="4">
              <ListCard
                title={{
                  first: "Расход",
                  second: dropDownExpense,
                  third: addButton
                }}
                type="expense"
                route="/"
                bodyList={filterTransactions("expense")}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "3%" }}>
            <Col>
              <div className="flex justify-center items-center border border-dark vh-40">
                <h5>Element</h5>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Loader className="flex justify-center items-center vh-30" />
      )}
    </>
  );
};

MainPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MainPage;
