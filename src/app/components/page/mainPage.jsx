import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, keys, uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";
import { toReadableDate } from "../../utils/functions/toReadableDate";
import Loader from "../ui/spinner";
import AccountCard from "../common/card/ListCard";
import Dropdown from "../common/form/dropdown";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selected, setSelected] = useState({
    account: "",
    date: ""
  });
  const [bodyList, setBodyList] = useState({
    account: [],
    income: [],
    expense: []
  });

  console.log(selected);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleDropdownSelect = (eventKey) => {
    const { id, type, date } = eventKey;

    setSelected({
      account: id,
      type,
      date: date || null
    });
  };

  const getAccountTransacts = (id) => {
    const result = filter(user.transactions || [], { account: id });

    if (id.includes("all")) {
      return user.transactions;
    } else if (id.includes("account")) {
      return result.length > 0 ? result : null;
    }
  };

  const getTransactsByType = (type) => {
    const result = filter(user.transactions || [], { type });
    return result.length > 0 ? result : null;
  };

  const getAccountTransactsByType = (id, type) => {
    const result = filter(getTransactsByType(type), { account: id });
    return result.length > 0 ? result : null;
  };

  // перенести в state
  const getUniqTransactDates = (type) => {
    return uniqBy(getTransactsByType(type), "date").map((uniq) => ({
      ...uniq,
      name: toReadableDate(uniq.date).dateOnly
    }));
  };

  const getTransacts = (selected, type) => {
    return [];
  };

  // const getBodyListItems = (type) => {
  //   const getTransacts = (selected, type) => {
  //     return (
  //       getAccountTransactsByType(selected, type) || getTransactsByType(type)
  //     );
  //   };

  //   switch (type) {
  //     case "account":
  //       // если у счета нет транзакций нельзя выводить все!
  //       return getAccountTransacts(selected.account) || user.transactions;
  //     case "income":
  //       return getTransacts(selected.account, type);
  //     case "expense":
  //       return getTransacts(selected.account, type);
  //   }
  // };

  useEffect(() => {
    setBodyList({
      account: getAccountTransacts(selected.account),
      income: getTransacts(selected, "income"),
      expense: getTransacts(selected, "expense")
    });
  }, [selected]);

  const dropDownIncome = (
    <Dropdown
      items={getUniqTransactDates("income")}
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
      items={getUniqTransactDates("expense")}
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
      {keys(user || []).length > 0 ? (
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
                bodyList={bodyList.income}
                bodyCol={{
                  third: delButton
                }}
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
                bodyList={bodyList.account}
                bodyCol={{
                  third: delButton
                }}
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
                route="/"
                bodyList={bodyList.expense}
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
