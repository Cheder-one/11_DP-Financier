import PropTypes from "prop-types";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { chain, filter, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import Loader from "../ui/spinner";
import AccountCard from "../common/card/accountCard";

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

  return (
    <>
      {keys(user).length > 0 ? (
        <div className="mx-4">
          <Row className="mt-4">
            <Col md="4">
              <AccountCard
                title="Доход"
                type="income"
                dropItems={income.uniqDates}
                bodyItems={income.transacts}
              />
            </Col>
            <Col md="4">
              <AccountCard
                title="Счета"
                type="account"
                dropItems={accounts}
                bodyItems={transactions}
              />
            </Col>
            <Col md="4">
              <AccountCard
                title="Расход"
                type="expense"
                dropItems={expense.uniqDates}
                bodyItems={expense.transacts}
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
