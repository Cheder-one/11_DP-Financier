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
  const [parentCard, setParentCard] = useState({ transactions: [] });
  const [childCard, setChildCard] = useState({
    income: { transacts: [], uniqDates: [] },
    expense: { transacts: [], uniqDates: [] }
  });

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  useEffect(() => {
    if (user.transactions) {
      setParentCard({ transactions: user.transactions });
    }
  }, [user.transactions]);

  const filteringTransactsByType = (type) => {
    return filter(parentCard.transactions || [], { type });
  };

  const getUniqTransactionDates = (type) => {
    return uniqBy(filteringTransactsByType(type), "date").map((t) => ({
      ...t,
      name: toReadableDate(t.date).date
    }));
  };

  const handleDropdownSelect = (eventKey) => {
    const { id, type, date } = eventKey;
    let bodyItems = [];
    let parentBodyItems = [];

    if (id.includes("all")) {
      switch (type) {
        case "account":
          parentBodyItems = user.transactions || [];
          break;
        case "income":
          bodyItems = filteringTransactsByType(type);
          break;
        case "expense":
          bodyItems = filteringTransactsByType(type);
          break;
      }
    } else if (id.includes("account")) {
      parentBodyItems = filter(user.transactions || [], { account: id });
    } else if (id.includes("transaction")) {
      switch (type) {
        case "income":
          // привести childCard в исходное состояние исходя из транзакций выбранного счета
          bodyItems = filter(childCard.income.transacts || [], { date });
          break;
        case "expense":
          // Handle expense case
          break;
      }
    }

    if (type === "account") {
      setParentCard({ transactions: parentBodyItems });
    } else {
      setChildCard((prev) => ({
        ...prev,
        [type]: {
          transacts: bodyItems,
          uniqDates: getUniqTransactionDates(type)
        }
      }));
    }
  };

  const dropDownIncome = (
    <Dropdown
      items={childCard.income.uniqDates}
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
      {keys(parentCard.transactions || []).length > 0 ? (
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
                bodyList={childCard?.income?.transacts}
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
                bodyList={parentCard.transactions}
                bodyCol={{
                  third: delButton
                }}
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
                bodyList={childCard?.expense?}
                bodyCol={{
                  third: delButton
                }}

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
