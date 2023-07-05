import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";
import { toReadableDate } from "../../utils/functions/toReadableDate";
import Loader from "../ui/spinner";
import AccountCard from "../common/card/accountCard";
import Dropdown from "../common/form/dropdown";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const { accounts, categories, transactions } = user;
  const [cardBodyItems, setCardBodyItems] = useState({
    income: [],
    expense: [],
    account: []
  });

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const filteredByUniqAndType = useMemo(() => {
    const types = ["income", "expense"];
    const result = {};

    types.forEach((type) => {
      const transacts = filter(transactions || [], { type });

      let uniqDates = uniqBy(transacts, "date");
      uniqDates = uniqDates.map((transact) => ({
        ...transact,
        name: toReadableDate(transact.date).date
      }));
      result[type] = { transacts, uniqDates };
    });
    return result;
  }, [transactions]);

  const { income, expense } = filteredByUniqAndType;

  const handleDropdownSelect = (eventKey) => {
    const { id, type: cardType, date } = eventKey;
    let bodyItems = [];

    if (id.includes("all")) {
      switch (cardType) {
        case "account":
          bodyItems = transactions;
          break;
        case "income":
          bodyItems = income.transacts;
          break;
        case "expense":
          bodyItems = expense.transacts;
          break;
      }
    } else if (id.includes("account")) {
      // Выбран конкретный счет, фильтруем транзакции по счету
      bodyItems = filter(transactions, { account: id });

      // Обновляем транзакции в карточке "Доходы"
      setCardBodyItems((prev) => ({
        ...prev,
        income: filter(income.transacts, { account: id })
      }));

      // Обновляем транзакции в карточке "Расходы"
      setCardBodyItems((prev) => ({
        ...prev,
        expense: filter(expense.transacts, { account: id })
      }));
    } else if (id.includes("transaction")) {
      bodyItems =
        cardType === "income"
          ? filter(income.transacts, { date })
          : filter(expense.transacts, { date });
    }

    setCardBodyItems((prev) => ({
      ...prev,
      [cardType]: bodyItems
    }));
  };

  const dropDownIncome = (
    <Dropdown
      items={income.uniqDates}
      type="income"
      onSelect={handleDropdownSelect}
    />
  );

  const dropDownAccount = (
    <Dropdown items={accounts} type="account" onSelect={handleDropdownSelect} />
  );

  const dropDownExpense = (
    <Dropdown
      items={expense.uniqDates}
      type="expense"
      onSelect={handleDropdownSelect}
    />
  );

  const addButton = (
    <Button variant="" className="p-0">
      <PlusSquare style={{ color: "yellowgreen" }} size={25} />
    </Button>
  );

  const delButton = (
    <Button variant="" size="sm" className="p-0">
      <CloseX style={{ color: "red" }} size={19} />
    </Button>
  );

  return (
    <>
      {keys(user).length > 0 ? (
        <div className="mx-4">
          <Row style={{ marginTop: "3%" }}>
            <Col md="4">
              <AccountCard
                title={{
                  first: "Доход",
                  second: dropDownIncome,
                  third: addButton
                }}
                type="income"
                route="/"
                bodyList={cardBodyItems.income}
                bodyCol={{
                  third: delButton
                }}
                dropDownList={income.uniqDates}
              />
            </Col>
            <Col md="4">
              <AccountCard
                title={{
                  first: "Счет",
                  second: dropDownAccount,
                  third: addButton
                }}
                type="account"
                bodyList={cardBodyItems.account}
                bodyCol={{
                  third: delButton
                }}
                dropDownList={accounts}
              />
            </Col>
            <Col md="4">
              <AccountCard
                title={{
                  first: "Расход",
                  second: dropDownExpense,
                  third: addButton
                }}
                type="expense"
                bodyList={cardBodyItems.expense}
                bodyCol={{
                  third: delButton
                }}
                dropDownList={expense.uniqDates}
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
