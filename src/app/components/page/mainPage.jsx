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

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const filterTransactionsByAccount = (account) => {
    if (account === null) return user.transactions;
    return filter(user.transactions, { account: account.id });
  };

  const filterDatesByAccount = (account) => {
    if (account === null) return [];
    const accountTransactions = filterTransactionsByAccount(account);
    return uniqBy(accountTransactions, "date").map(
      (transaction) => transaction.date
    );
  };

  const handleDropdownSelect = (eventKey, type) => {
    if (type === "account") {
      const account = JSON.parse(eventKey);
      handleAccountSelect(account);
    }
  };

  const dropDownIncome = (
    <Dropdown
      items={filterDatesByAccount(selectedAccount)}
      type="income"
      onSelect={handleDropdownSelect}
    />
  );

  const dropDownAccount = (
    <Dropdown
      items={user.accounts}
      type="account"
      onSelect={handleDropdownSelect}
    />
  );

  const dropDownExpense = (
    <Dropdown
      items={filterDatesByAccount(selectedAccount)}
      type="expense"
      onSelect={handleDropdownSelect}
    />
  );

  const addButton = "+";
  const delButton = "-";

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
                bodyList={filterTransactionsByAccount(selectedAccount)}
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
                bodyList={filterTransactionsByAccount(selectedAccount)}
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
                bodyList={filterTransactionsByAccount(selectedAccount)}
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
