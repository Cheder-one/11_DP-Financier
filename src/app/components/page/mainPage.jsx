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
  const [selectedAccount, setSelectedAccount] = useState(null);
  console.log(selectedAccount);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleDropdownSelect = (eventKey) => {
    const { id, type, date } = eventKey;

    setSelectedAccount(id);
  };

  const getTransactsByType = (type) => {
    return filter(user.transactions || [], { type });
  };

  const getUniqTransactDates = (type) => {
    return uniqBy(getTransactsByType(type), "date").map((uniq) => ({
      ...uniq,
      name: toReadableDate(uniq.date).dateOnly
    }));
  };

  const getAccountTransactsByType = (accountId, type) => {
    const result = filter(getTransactsByType(type), { account: accountId });
    return result.length > 0 ? result : null;
  };

  const getBodyListItems = (type) => {
    switch (type) {
      case "account":
        return user.transactions;
      case "income":
        return (
          getAccountTransactsByType(selectedAccount, "income") ||
          user.transactions
        );
      case "expend":
        console.log();
        break;
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
                bodyList={[]}
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
