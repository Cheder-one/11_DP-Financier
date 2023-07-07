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
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [currentAccountTransactions, setCurrentAccountTransactions] =
    useState();

  console.log(currentAccountTransactions);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  // Счет по-умолчанию
  useEffect(() => {
    setSelectedAccountId("all-account-ids");
  }, []);

  const getAccountTransactions = (accId, data) => {
    const dataToFilter = data || user.transactions;

    let transactionData = null;

    if (accId.includes("all-account")) {
      transactionData = user.transactions;
    } else if (accId.includes("account")) {
      transactionData = filter(dataToFilter, { account: accId });
    }

    return transactionData;
  };

  // Все Транзакции текущего счета  (для карточки "Счета")
  useEffect(() => {
    const result = getAccountTransactions(selectedAccountId);
    console.log(selectedAccountId);

    setCurrentAccountTransactions(result);
  }, [selectedAccountId, user]);

  const handleDropdownSelect = (eventKey) => {
    const { id, date, type } = eventKey;

    setSelectedAccountId(id);
  };

  const dropDownIncome = (
    <Dropdown items={[]} type="income" onSelect={handleDropdownSelect} />
  );

  const dropDownAccount = (
    <Dropdown
      items={user.accounts}
      type="account"
      onSelect={handleDropdownSelect}
    />
  );

  const dropDownExpense = (
    <Dropdown items={[]} type="expense" onSelect={handleDropdownSelect} />
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
      {keys(user.transactions || []).length > 0 ? (
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
                bodyList={
                  // bodyItems.income
                  []
                }
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
                bodyList={
                  // bodyItems.account
                  []
                }
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
                bodyList={
                  // bodyItems.expense
                  []
                }
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
