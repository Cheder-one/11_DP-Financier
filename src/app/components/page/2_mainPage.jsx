/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import axios from "axios";
import { chain, isArray } from "lodash";
import { Col, Row } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import Loader from "../ui/spinner";
import AccountCard from "../common/card_2/2_accountCard";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState();
  const { accounts, categories, transactions } = user || {};

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const getUniqTransactDates = (type) =>
    chain(transactions || [])
      .filter({ type })
      .uniqBy("date")
      .value();

  const uniqDates = useMemo(
    () => ({
      expense: getUniqTransactDates("expense"),
      income: getUniqTransactDates("income")
    }),
    [transactions]
  );

  return (
    <>
      {user ? (
        <div className="mx-4">
          <Row className="mt-4">
            <Col md="4">
              <AccountCard
                title="Доходы"
                dropItems={uniqDates.income}
                data={[]}
                defaultCategory="Все"
              />
            </Col>
            <Col md="4">
              <AccountCard
                title="Счета"
                dropItems={accounts}
                data={[]}
                defaultCategory="Все"
              />
            </Col>
            <Col md="4">
              <AccountCard
                title="Расходы"
                dropItems={uniqDates.expense}
                data={[]}
                defaultCategory="Все"
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
