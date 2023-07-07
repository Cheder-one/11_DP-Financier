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

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setSelectedDate(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDropdownSelect = (params) => {};

  const filterTransactions = () => {
    let filteredTransactions = user.transactions;

    if (selectedAccount && selectedAccount !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.account === selectedAccount
      );
    }

    if (selectedDate && selectedDate !== "all") {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.date.includes(selectedDate)
      );
    }

    return filteredTransactions;
  };

  const dropDownIncome = (
    <Dropdown items={[]} type="income" onSelect={handleDropdownSelect} />
  );

  const dropDownAccount = (
    <Dropdown
      items={user.accounts}
      type="account"
      onSelect={handleAccountSelect}
    />
  );

  const dropDownExpense = (
    <Dropdown items={[]} type="expense" onSelect={handleDropdownSelect} />
  );

  const addButton = <button>"кнопка"</button>;

  const delButton = <button>"кнопка"</button>;

  return (
    <>
      {Object.keys(user).length > 0 ? (
        <div className="mx-4">
          <Row style={{ marginTop: "3%" }}>
            <Col md="4">
              <ListCard
                md={[4, 4, 4]}
                title={{
                  first: "Доход",
                  second: dropDownIncome,
                  third: addButton
                }}
                type="income"
                route="/"
                bodyList={filterTransactions()}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>
            <Col md="4">
              <ListCard
                md={[4, 4, 4]}
                title={{
                  first: "Счет",
                  second: dropDownAccount,
                  third: addButton
                }}
                type="account"
                bodyList={filterTransactions()}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>
            <Col md="4">
              <ListCard
                md={[4, 4, 4]}
                title={{
                  first: "Расход",
                  second: dropDownExpense,
                  third: addButton
                }}
                type="expense"
                route="/"
                bodyList={filterTransactions()}
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
