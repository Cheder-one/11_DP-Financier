import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import Loader from "../ui/spinner";
import AccountCard from "../common/card/accountCard";
import Dropdown from "../common/form/dropdown";

import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";
import { toReadableDate } from "../../utils/functions/toReadableDate";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const { accounts, categories, transactions } = user;

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleDropdownSelect = (eventKey) => {
    console.log(eventKey);
  };

  // Фильтрация транзакций по их  для каждого типа.
  const filteredByUniqAndType = useMemo(() => {
    const result = {};
    ["income", "expense"].forEach((type) => {
      const transacts = filter(transactions || [], { type });
      const uniqDates = uniqBy(transacts, "date").map((t) => ({
        ...t,
        name: toReadableDate(t.date).date
      }));
      result[type] = { transacts, uniqDates };
    });
    return result;
  }, [transactions]);

  const { income, expense } = filteredByUniqAndType;

  const dropDownIncome = (
    <Dropdown
      // title="Dropdown"
      items={income.uniqDates}
      type="income"
      onSelect={handleDropdownSelect}
    />
  );

  const dropDownAccount = (
    <Dropdown
      // title="Dropdown"
      items={accounts}
      type="account"
      onSelect={handleDropdownSelect}
    />
  );

  const dropDownExpense = (
    <Dropdown
      // title="Dropdown"
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
          <Row className="mt-4">
            <Col md="4">
              <AccountCard
                title={{
                  first: "Доход",
                  second: dropDownIncome,
                  third: addButton
                }}
                type="income"
                route="/"
                bodyList={income.transacts}
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
                bodyList={transactions}
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
                bodyList={expense.transacts}
                bodyCol={{
                  third: delButton
                }}
                dropDownList={expense.uniqDates}
              />
            </Col>
          </Row>

          <Row className="mt-4">
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
