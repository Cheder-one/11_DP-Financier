import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";
import { toReadableDate } from "../../utils/functions/toReadableDate";
import Loader from "../ui/spinner";
import ListCard from "../common/card/ListCard";
import Dropdown from "../common/form/dropdown";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedExpenseDate, setSelectedExpenseDate] = useState(null);
  const [selectedIncomeDate, setSelectedIncomeDate] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleAccountSelect = (eventKey) => {
    setSelectedAccount(eventKey.id);
    setSelectedExpenseDate(null);
    setSelectedIncomeDate(null);
  };

  const handleExpenseDateSelect = (eventKey) => {
    setSelectedExpenseDate(eventKey.date);
  };

  const handleIncomeDateSelect = (eventKey) => {
    setSelectedIncomeDate(eventKey.date);
  };

  const filteredTransactions = user.transactions?.filter((transaction) => {
    if (selectedAccount === null || selectedAccount === "all") {
      return true;
    }

    if (transaction.account === selectedAccount) {
      if (selectedExpenseDate !== null && transaction.type === "expense") {
        return transaction.date === selectedExpenseDate;
      }

      if (selectedIncomeDate !== null && transaction.type === "income") {
        return transaction.date === selectedIncomeDate;
      }

      return true;
    }

    return false;
  });

  const addButton = <button>кнопка</button>;

  const delButton = <button>кнопка</button>;

  const getUniqueDates = () => {
    const expenseDates = [];
    user.transactions?.forEach((transaction) => {
      if (
        transaction.type === "expense" &&
        transaction.account === selectedAccount
      ) {
        if (!expenseDates.includes(transaction.date)) {
          expenseDates.push(transaction.date);
        }
      }
    });
    return expenseDates;
  };

  const dropDownIncome = (
    <Dropdown
      items={user.categories}
      type="income"
      onSelect={handleIncomeDateSelect}
    />
  );

  const dropDownAccount = (
    <Dropdown
      items={user.accounts}
      type="account"
      onSelect={handleAccountSelect}
    />
  );

  // const dropDownExpense = (
  //   <Dropdown
  //     items={getUniqueDates()}
  //     type="expense"
  //     onSelect={handleExpenseDateSelect}
  //   />
  // );

  return (
    <>
      {Object.keys(user).length > 0 ? (
        <div className="mx-4">
          <Row style={{ marginTop: "3%" }}>
            <Col md="4">
              <ListCard
                md={[4, 8, 4]}
                title={{
                  first: "Доход",
                  second: dropDownIncome,
                  third: addButton
                }}
                type="income"
                route="/"
                bodyList={filteredTransactions?.filter(
                  (transaction) => transaction.type === "income"
                )}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>
            <Col md="4">
              <ListCard
                md={[4, 8, 4]}
                title={{
                  first: "Счет",
                  second: dropDownAccount,
                  third: addButton
                }}
                type="account"
                bodyList={filteredTransactions}
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
