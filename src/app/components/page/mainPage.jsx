import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { chain, filter, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import Loader from "../ui/spinner";
import AccountCard from "../common/card/accountCard";
import Dropdown from "../common/form/dropdown";
import OverlayTooltip from "../common/typography/overlayTooltip";

import { BiSolidPlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid } from "react-icons/lia";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const { accounts, categories, transactions } = user;

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const getTransactsByType = (type) => filter(transactions || [], { type });
  const getUniqDates = (transacts) => uniqBy(transacts, "date");

  const income = useMemo(() => {
    const transacts = getTransactsByType("income");
    const uniqDates = getUniqDates(transacts);
    return { transacts, uniqDates };
  }, [transactions]);

  const expense = useMemo(() => {
    const transacts = getTransactsByType("expense");
    const uniqDates = getUniqDates(transacts);
    return { transacts, uniqDates };
  }, [transactions]);

  const dropdown = (
    <Dropdown items={[]}>
      <OverlayTooltip text={"Dropdownnnnnnnnnn"} />
    </Dropdown>
  );

  const dropDownAccount = <Dropdown title="Dropdown" items={accounts} />;

  // const dropDownExpense = <Dropdown title="Dropdown" items={accounts} />;

  const addButton = (
    <Button variant="" className="p-0">
      <BiSolidPlusSquare style={{ color: "yellowgreen" }} size={25} />
    </Button>
  );

  const delButton = (
    <Button variant="" size="sm" className="p-0">
      <LiaWindowCloseSolid style={{ color: "red" }} size={18} />
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
                  second: dropdown,
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
                  second: dropdown,
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
