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
  const { accounts, categories, transactions } = user || [];
  const [selectedAccount, setSelectedAccount] = useState({ id: "" });

  const [cardBodyItems, setCardBodyItems] = useState({
    account: [],
    income: [],
    expense: []
  });

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => {
        setUser(resp.data.user);
        const { transactions } = resp.data.user;
        setCardBodyItems({
          account: transactions,
          income: filter(transactions, { type: "income" }),
          expense: filter(transactions, { type: "expense" })
        });
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const getUniqDates = (data) => {
    return uniqBy(data, "date").map((uniq) => ({
      ...uniq,
      name: toReadableDate(uniq.date).dateOnly
    }));
  };

  const filteredByUniqAndType = useMemo(() => {
    const types = ["income", "expense"];
    const { id } = selectedAccount;
    const result = {};

    types.forEach((type) => {
      const transacts = filter(transactions, { type });
      let uniqDates = getUniqDates(transacts);

      if (id.includes("account-id-")) {
        const accTransacts = filter(transacts, { account: id });
        uniqDates = getUniqDates(accTransacts);
      }

      result[type] = { transacts, uniqDates };
    });

    return result;
  }, [transactions, selectedAccount]);

  const { income, expense } = filteredByUniqAndType;

  const updIncExpTransacts = (id) => {
    setCardBodyItems((prev) => ({
      ...prev,
      income: filter(income.transacts, { account: id }),
      expense: filter(expense.transacts, { account: id })
    }));
  };

  const handleDropdownSelect = (eventKey) => {
    const { id, type: cardType, date } = eventKey;
    const dataByCardType = filteredByUniqAndType[cardType];
    // setSelectedAccount({ id });

    if (id.includes("all")) {
      // setSelectedAccount({ id });
      console.log(selectedAccount);

      cardType === "account"
        ? setCardBodyItems({
            account: transactions,
            income: income.transacts,
            expense: expense.transacts
          })
        : setCardBodyItems((prev) => ({
            ...prev,
            [cardType]: selectedAccount.id.includes("account-id-")
              ? filter(dataByCardType.transacts, {
                  account: selectedAccount.id
                })
              : dataByCardType.transacts
          }));
    } else if (id.includes("account")) {
      setSelectedAccount({ id });
      setCardBodyItems((prev) => ({
        ...prev,
        [cardType]: filter(transactions, { account: id })
      }));
      updIncExpTransacts(id);
    } else if (id.includes("transaction")) {
      setCardBodyItems((prev) => ({
        ...prev,
        [cardType]: filter(dataByCardType.transacts, { date })
      }));
    }
  };

  const dropDownIncome = (
    <Dropdown
      items={income.uniqDates}
      type="income"
      onSelect={handleDropdownSelect}
    />
  );

  const dropDownAccount = (
    <Dropdown items={accounts} type="account" onSelect={handleDropdownSelect} />
  );

  const dropDownExpense = (
    <Dropdown
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
                bodyList={cardBodyItems.income}
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
                bodyList={cardBodyItems.account}
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
                bodyList={cardBodyItems.expense}
                bodyCol={{
                  third: delButton
                }}
                dropDownList={expense.uniqDates}
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
