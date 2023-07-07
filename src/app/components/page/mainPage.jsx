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
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    date: ""
  });

  console.log(selectedItem);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleDropdownSelect = (eventKey) => {
    const { id, type, date } = eventKey;
    const is = (idPart) => id.includes(idPart);

    let selectedDate = null;

    console.log(id);
    console.log(date);

    if (is("all")) {
      //
    } else if (is("account")) {
      //
    } else if (is("transaction")) {
      selectedDate = date;

      // switch (type) {
      //   case "income":
      //     selectedDate = date;
      //     // setSelectedItem((prev) => ({ ...prev, date }));
      //     break;
      //   case "expend":
      //     selectedDate = date;
      //     break;
      // }
    }
    setSelectedItem({ id, date: selectedDate });
    // setSelectedDate(date);
  };

  const getTransactsByType = (type) => {
    return filter(user.transactions || [], { type });
  };

  const getAccountTransacts = (accountId) => {
    const result = filter(user.transactions || [], { account: accountId });
    return result.length > 0 ? result : null;
  };

  const getAccountTransactsByType = (accountId, type) => {
    const result = filter(getTransactsByType(type), { account: accountId });
    return result.length > 0 ? result : null;
  };

  const getUniqTransactDates = (type) => {
    return uniqBy(getTransactsByType(type), "date").map((uniq) => ({
      ...uniq,
      name: toReadableDate(uniq.date).dateOnly
    }));
  };

  const getBodyListItems = (type) => {
    const getTransacts = (selectedItem, type) => {
      return (
        getAccountTransactsByType(selectedItem, type) ||
        getTransactsByType(type)
      );
    };

    switch (type) {
      case "account":
        return getAccountTransacts(selectedItem.id) || user.transactions;
      case "income":
        return getTransacts(selectedItem.id, type);
      case "expense":
        return getTransacts(selectedItem.id, type);
    }
  };

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
                bodyList={getBodyListItems("income")}
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
                bodyList={getBodyListItems("account")}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>
            <Col md="4">
              <AccountCard
                title={{
                  first: "Расход",
                  second: dropDownIncome,
                  third: addButton
                }}
                type="expense"
                route="/"
                bodyList={getBodyListItems("expense")}
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
