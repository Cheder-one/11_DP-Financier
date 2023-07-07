import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, keys, uniqBy } from "lodash";
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

  const handleDropdownSelect = (eventKey, type) => {
    if (type === "account") {
      setSelectedAccount(eventKey);
      setSelectedDate(null);
    } else {
      setSelectedDate(eventKey);
    }
  };

  const filterTransactions = () => {
    let filteredTransactions = user.transactions;

    if (selectedAccount && selectedAccount.id !== "all-account-ids") {
      filteredTransactions = filter(filteredTransactions, {
        account: selectedAccount.id
      });
    }

    if (
      selectedDate &&
      selectedDate.id !== "all-expense-ids" &&
      selectedAccount &&
      selectedAccount.id !== "all-account-ids"
    ) {
      filteredTransactions = filter(filteredTransactions, {
        date: selectedDate.id
      });
    }

    return filteredTransactions;
  };

  const getAccountDropdownItems = () => {
    const accountItems =
      user.accounts ||
      [].map((account) => {
        return {
          id: account.id,
          type: "account",
          name: account.name
        };
      });

    return [
      { id: "all-account-ids", type: "account", name: "Все" },
      ...accountItems
    ];
  };

  const getExpenseDropdownItems = () => {
    let expenseItems = [];

    if (selectedAccount && selectedAccount.id !== "all-account-ids") {
      const transactions = filter(user.transactions, {
        account: selectedAccount.id
      });
      const uniqueDates = uniqBy(transactions, "date");
      expenseItems = uniqueDates.map((transaction) => {
        return {
          id: transaction.date,
          type: "expense",
          name: transaction.date
        };
      });
    }

    return [
      { id: "all-expense-ids", type: "expense", name: "Все" },
      ...expenseItems
    ];
  };

  const accountDropdownItems = getAccountDropdownItems();
  const expenseDropdownItems = getExpenseDropdownItems();

  const handleAddButtonClick = () => {
    // Обработчик для кнопки добавления
  };

  const handleDeleteButtonClick = () => {
    // Обработчик для кнопки удаления
  };

  const filteredTransactions = filterTransactions();

  return (
    <>
      {keys(user || []).length > 0 ? (
        <div className="mx-4">
          <Row style={{ marginTop: "3%" }}>
            <Col md="4">
              <ListCard
                title={{
                  first: "Доход",
                  second: (
                    <Dropdown
                      items={[]}
                      type="income"
                      onSelect={handleDropdownSelect}
                    />
                  ),
                  third: (
                    <Button variant="primary" onClick={handleAddButtonClick}>
                      +
                    </Button>
                  )
                }}
                type="income"
                route="/"
                bodyList={[]}
                bodyCol={{
                  third: (
                    <Button variant="danger" onClick={handleDeleteButtonClick}>
                      -
                    </Button>
                  )
                }}
              />
            </Col>
            <Col md="4">
              <ListCard
                title={{
                  first: "Счет",
                  second: (
                    <Dropdown
                      items={accountDropdownItems}
                      type="account"
                      onSelect={(eventKey) =>
                        handleDropdownSelect(eventKey, "account")
                      }
                    />
                  ),
                  third: (
                    <Button variant="primary" onClick={handleAddButtonClick}>
                      +
                    </Button>
                  )
                }}
                type="account"
                bodyList={[]}
                bodyCol={{
                  third: (
                    <Button variant="danger" onClick={handleDeleteButtonClick}>
                      -
                    </Button>
                  )
                }}
              />
            </Col>
            <Col md="4">
              <ListCard
                title={{
                  first: "Расход",
                  second: (
                    <Dropdown
                      items={expenseDropdownItems}
                      type="expense"
                      onSelect={(eventKey) =>
                        handleDropdownSelect(eventKey, "expense")
                      }
                    />
                  ),
                  third: (
                    <Button variant="primary" onClick={handleAddButtonClick}>
                      +
                    </Button>
                  )
                }}
                type="expense"
                route="/"
                bodyList={[]}
                bodyCol={{
                  third: (
                    <Button variant="danger" onClick={handleDeleteButtonClick}>
                      -
                    </Button>
                  )
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

export default MainPage;
