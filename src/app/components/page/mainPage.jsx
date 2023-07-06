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
  const { accounts, categories } = user;
  const [parentCardBodyItems, setParentCardBodyItems] = useState({
    transactions: []
  });

  const [cardBodyItems, setCardBodyItems] = useState({});

  console.log(cardBodyItems?.income?.uniqDates);

  const filtrationTransactsByType = (type) => {
    return filter(parentCardBodyItems.transactions, { type });
  };

  const getUniqTransactsDates = (type) => {
    return uniqBy(filtrationTransactsByType(type), "date").map((t) => ({
      ...t,
      name: toReadableDate(t.date).date
    }));
  };

  useEffect(() => {
    setCardBodyItems((prev) => ({
      ...prev,
      income: {
        transacts: filtrationTransactsByType("income"),
        uniqDates: getUniqTransactsDates("income")
      },
      expense: {
        transacts: filtrationTransactsByType("expense"),
        uniqDates: getUniqTransactsDates("expense")
      }
    }));
  }, [parentCardBodyItems.transactions, user]);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  // // Фильтрует транзакции на доход/расход
  // // Создает массив не дублирующихся дат когда были транзакции
  // const filteredByUniqAndType = useMemo(() => {
  //   const types = ["income", "expense"];
  //   const result = {};

  //   types.forEach((type) => {
  //     const transacts = filter(transactions || [], { type });
  //     const uniqDates = uniqBy(transacts, "date").map((t) => ({
  //       ...t,
  //       name: toReadableDate(t.date).date
  //     }));
  //     result[type] = { transacts, uniqDates };
  //   });
  //   return result;
  // }, [transactions]);

  // const { income, expense } = filteredByUniqAndType;

  // // Получение транзакций принадлежащие выбранному счету
  // const updIncExpTransacts = (id) => {
  //   setCardBodyItems((prev) => ({
  //     ...prev,
  //     income: filter(income.transacts, { account: id }),
  //     expense: filter(expense.transacts, { account: id })
  //   }));
  // };

  // Обработчик dropdown -
  // определяет в какой карточке был выбор.
  // определяет какой item был выбран в drop-листе карточки.

  const handleDropdownSelect = (eventKey) => {
    const { id, type, date } = eventKey;
    let bodyItems = [];

    if (id.includes("all")) {
      switch (type) {
        case "account":
          bodyItems = user.transactions;
          break;
        case "income":
          bodyItems = cardBodyItems?.income?.transacts;
          break;
        case "expense":
          bodyItems = cardBodyItems?.expense?.transacts;
          break;
      }
    } else if (id.includes("account")) {
      bodyItems = filter(user.transactions, { account: id });
      // updIncExpTransacts(id);
    } else if (id.includes("transaction")) {
      switch (type) {
        case "income":
          bodyItems = filter(cardBodyItems?.income?.transacts, { date });
          break;
        case "expense":
          bodyItems = filter(cardBodyItems?.expense?.transacts, { date });
          break;
      }
      // bodyItems =
      //   type === "income"
      //     ? filter(cardBodyItems?.income?.transacts, { date })
      //     : filter(cardBodyItems?.expense?.transacts, { date });
    }
    // console.log(cardBodyItems);

    // setCardBodyItems((prev) => ({
    //   ...prev,
    //   [cardType]: bodyItems
    // }));

    if (type === "account") {
      setParentCardBodyItems((prev) => ({
        ...prev,
        transactions: bodyItems
      }));
    } else {
      setCardBodyItems((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          transacts: bodyItems
        }
      }));
    }
  };

  // console.log(cardBodyItems?.income?.uniqDates);

  const dropDownIncome = (
    <Dropdown
      items={cardBodyItems?.income?.uniqDates}
      type="income"
      onSelect={handleDropdownSelect}
    />
  );

  const dropDownAccount = (
    <Dropdown items={accounts} type="account" onSelect={handleDropdownSelect} />
  );

  // const dropDownExpense = (
  //   <Dropdown
  //     items={expense.uniqDates}
  //     type="expense"
  //     onSelect={handleDropdownSelect}
  //   />
  // );

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
                bodyList={cardBodyItems?.income?.transacts}
                bodyCol={{
                  third: delButton
                }}
                // dropDownList={income.uniqDates}
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
                bodyList={parentCardBodyItems.transactions}
                bodyCol={{
                  third: delButton
                }}
                // dropDownList={accounts}
              />
            </Col>
            <Col md="4">
              {/* <AccountCard
                title={{
                  first: "Расход",
                  second: dropDownExpense,
                  third: addButton
                }}
                type="expense"
                bodyList={cardBodyItems?.expense?}
                bodyCol={{
                  third: delButton
                }}
                // dropDownList={expense.uniqDates}
              /> */}
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
