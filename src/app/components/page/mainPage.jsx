import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, find, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";
import { toReadableDate } from "../../utils/functions/toReadableDate";
import Loader from "../ui/spinner";
import AccountCard from "../common/card/accountCard";
import Dropdown from "../common/form/dropdown";

const getUniqDates = (data) => {
  return uniqBy(data, "date").map((uniq) => ({
    ...uniq,
    name: toReadableDate(uniq.date).dateOnly
  }));
};

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const { accounts, categories, transactions } = user || [];
  const [selectedAccount, setSelectedAccount] = useState({
    id: "",
    reset: false
  });
  const [cardBodyItems, setCardBodyItems] = useState({
    account: [],
    income: [],
    expense: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const { user: userData } = response.data;
        setUser(userData);

        const { transactions } = userData;
        setCardBodyItems({
          account: transactions,
          income: filter(transactions, { type: "income" }),
          expense: filter(transactions, { type: "expense" })
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);

  // Трансформирую данные body каждой карточки, чтобы универсальный компонент мог принимать любые значения, независимо от их name.
  const getCardBodyColumnItems = (cards) => {
    const updatedCards = {};

    keys(cards).forEach((key) => {
      const card = cards[key];
      const updatedCard = card.map((item) => ({
        ...item,
        firstCol: item.amount,
        secondCol: find(categories, { id: item.category }).name,
        thirdCol: null
      }));
      updatedCards[key] = updatedCard;
    });

    return updatedCards;
  };

  // Мутирует исходный объект
  // const getCardBodyColumnItems = (cards) => {
  //   keys(cards).forEach((key) => {
  //     const card = cards[key];
  //     card.forEach((item) => {
  //       item.firstCol = item.amount;
  //       item.secondCol = find(categories, { id: item.category }).name;
  //       item.thirdCol = null;
  //     });
  //   });
  //   return cards;
  // };

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
    const { id: selAccId } = selectedAccount;
    const dataByCardType = filteredByUniqAndType[cardType];
    let bodyItems = null;

    if (cardType === "account") {
      setSelectedAccount((prev) => ({ ...prev, reset: true }));
    }

    if (id.includes("all")) {
      if (cardType === "account") {
        setCardBodyItems({
          account: transactions,
          income: income.transacts,
          expense: expense.transacts
        });
      } else {
        bodyItems = selAccId.includes("account-id-")
          ? filter(dataByCardType.transacts, { account: selAccId })
          : dataByCardType.transacts;
      }
    } else if (id.includes("account")) {
      bodyItems = filter(transactions, { account: id });
      setSelectedAccount((prev) => ({ ...prev, id }));
      updIncExpTransacts(id);
    } else if (id.includes("transaction")) {
      bodyItems = filter(dataByCardType.transacts, { date });
      setSelectedAccount((prev) => ({ ...prev, reset: false }));
    }

    if (bodyItems) {
      setCardBodyItems((prev) => ({
        ...prev,
        [cardType]: bodyItems
      }));
    }
  };

  const cardBodyColItems = getCardBodyColumnItems(cardBodyItems);

  if (keys(user || {}).length > 0) {
    const dropDownIncome = (
      <Dropdown
        items={income.uniqDates}
        type="income"
        onSelect={handleDropdownSelect}
        reset={selectedAccount.reset}
      />
    );
    const dropDownAccount = (
      <Dropdown
        items={accounts}
        type="account"
        onSelect={handleDropdownSelect}
      />
    );
    const dropDownExpense = (
      <Dropdown
        items={expense.uniqDates}
        type="expense"
        onSelect={handleDropdownSelect}
        reset={selectedAccount.reset}
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
      <div className="mx-4">
        <Row style={{ marginTop: "3%" }}>
          <Col md="4">
            <AccountCard
              title={{
                first: "Доход",
                second: dropDownIncome,
                third: addButton
              }}
              route="/"
              bodyList={cardBodyColItems.income}
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
              route="/"
              bodyList={cardBodyColItems.account}
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
              route="/"
              bodyList={cardBodyColItems.expense}
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
    );
  } else {
    return <Loader className="flex justify-center items-center vh-30" />;
  }
};

MainPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MainPage;
