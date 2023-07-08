import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";
import { toReadableDate } from "../../utils/functions/toReadableDate";
import Loader from "../ui/spinner";
import AccountCard from "../common/card/ListCard";
import Dropdown from "../common/form/dropdown";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const { accounts, categories, transactions } = user || [];
  const [selectedAccount, setSelectedAccount] = useState("");
  const [cardBodyItems, setCardBodyItems] = useState({
    account: [],
    income: [],
    expense: []
  });

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => {
        setUser(resp.data.user);
        const { transactions } = resp.data.user;
        setCardBodyItems({
          account: transactions,
          income: filter(transactions, { type: "income" }),
          expense: filter(transactions, { type: "expense" })
        });
      })
      .catch((err) => console.error(err));
  }, [userId]);

  // Фильтрует транзакции по типу, доход/расход
  // Создает массив уникальных дат транзакций
  const filteredByUniqAndType = useMemo(() => {
    const types = ["income", "expense"];
    const result = {};

    types.forEach((type) => {
      const transacts = filter(transactions, { type });
      const uniqDates = uniqBy(transacts, "date").map((uniq) => ({
        ...uniq,
        name: toReadableDate(uniq.date).dateOnly
      }));
      result[type] = { transacts, uniqDates };
    });
    return result;
  }, [transactions]);

  const { income, expense } = filteredByUniqAndType;

  // Получение транзакций принадлежащие выбранному счету
  const updIncExpTransacts = (id) => {
    setCardBodyItems((prev) => ({
      ...prev,
      income: filter(income.transacts, { account: id }),
      expense: filter(expense.transacts, { account: id })
    }));
  };

  // Обработчик dropdown -
  // определяет в какой карточке был выбор.
  // определяет какой item был выбран в drop-листе карточки.
  const handleDropdownSelect = (eventKey) => {
    const { id, type: cardType, date } = eventKey;

    // if (id) {
    //   setSelectedAccount();
    // }

    if (id.includes("all")) {
      cardType === "account"
        ? setCardBodyItems({
            account: transactions,
            income: income.transacts,
            expense: expense.transacts
          })
        : setCardBodyItems((prev) => ({
            ...prev,
            [cardType]: filteredByUniqAndType[cardType].transacts
          }));
    } else if (id.includes("account")) {
      setCardBodyItems((prev) => ({
        ...prev,
        [cardType]: filter(transactions, { account: id })
      }));
      updIncExpTransacts(id);
    } else if (id.includes("transaction")) {
      setCardBodyItems((prev) => ({
        ...prev,
        [cardType]: filter(filteredByUniqAndType[cardType].transacts, { date })
      }));
    }
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
      {keys(user || {}).length > 0 ? (
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
