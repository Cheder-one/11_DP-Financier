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
    } else if (type === "date") {
      setSelectedDate(eventKey);
    }
  };

  const dropDownIncome = (
    <Dropdown items={[]} type="income" onSelect={handleDropdownSelect} />
  );

  const dropDownAccount = (
    <Dropdown
      items={user.accounts}
      type="account"
      onSelect={(eventKey) => handleDropdownSelect(eventKey, "account")}
    />
  );

  const dropDownExpense = (
    <Dropdown items={[]} type="expense" onSelect={handleDropdownSelect} />
  );

  const addButton = "+";
  const delButton = "-";

  // Filter transactions based on selected account and date
  const filteredTransactions =
    user.transactions ||
    [].filter((transaction) => {
      if (selectedAccount === null || transaction.account === selectedAccount) {
        if (selectedDate === null) {
          return true;
        } else {
          const transactionDate = new Date(transaction.date).toDateString();
          return transactionDate === selectedDate;
        }
      }
      return false;
    });

  // Get unique dates for selected account
  const uniqueDates =
    user.transactions ||
    []
      .filter((transaction) => transaction.account === selectedAccount)
      .reduce((dates, transaction) => {
        const transactionDate = new Date(transaction.date).toDateString();
        if (!dates.includes(transactionDate)) {
          dates.push(transactionDate);
        }
        return dates;
      }, []);

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
                bodyList={[]}
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
                bodyList={filteredTransactions}
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
                bodyList={filteredTransactions.filter(
                  (transaction) => transaction.amount < 0
                )}
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
