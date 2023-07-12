import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { filter, find, keys, uniqBy } from "lodash";
import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";

import Loader from "../ui/spinner";
import AccountCard from "../common/card/accountCard";
import Dropdown from "../common/form/dropdown";
import { toReadableDate } from "../../utils/functions/toReadableDate";

// Создает массив уникальных дат транзакций для dropdownList
const getUniqDates = (data) => {
  return uniqBy(data, "date").map((uniq) => ({
    ...uniq,
    name: toReadableDate(uniq.date).dateOnly
  }));
};

// Обновляет список транзакций согласно выбранному счету.
const updIncomeExpenseTransacts = (id, income, expense, setCardBodyItems) => {
  setCardBodyItems((prev) => ({
    ...prev,
    income: filter(income.transacts, { account: id }),
    expense: filter(expense.transacts, { account: id })
  }));
};

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selectedAccount, setSelectedAccount] = useState({ id: "" });
  const [resetDropTitle, setResetDropTitle] = useState(false);
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

  // Универсализирует данные для отправки в AccountCard, чтобы компонент не был привязан к конкретным переменным.
  const transformedBodyItems = useMemo(() => {
    const updatedCards = {};

    keys(cardBodyItems).forEach((key) => {
      const card = cardBodyItems[key];
      const updatedCard = card.map((item) => ({
        ...item,
        firstCol: item.amount,
        secondCol: find(user.categories, { id: item.category }).name
      }));
      updatedCards[key] = updatedCard;
    });

    return updatedCards;
  }, [cardBodyItems, user.categories]);

  // Фильтрует транзакции по типу (расход/доход). Создает под каждый тип массив уникальных дат для возможности отображения транзакций по датам.
  const filteredByUniqAndType = useMemo(() => {
    const types = ["income", "expense"];
    const { id } = selectedAccount;
    const result = {};

    types.forEach((type) => {
      const transacts = filter(user.transactions, { type });
      let uniqDates = getUniqDates(transacts);

      // Фильтрует транзакции под конкретный счет (если выбран). Создает массив uniqDates.
      if (id.includes("account-id-")) {
        const accountTransacts = filter(transacts, { account: id });
        uniqDates = getUniqDates(accountTransacts);
      }

      result[type] = { transacts, uniqDates };
    });

    return result;
  }, [user.transactions, selectedAccount]);

  const { income, expense } = filteredByUniqAndType;

  // Обработчик Dropdown.
  const handleDropdownSelect = (eventKey) => {
    const { id, type: cardType, date } = eventKey;
    const { id: selAccId } = selectedAccount;
    const dataByCardType = filteredByUniqAndType[cardType];
    let bodyItems = null;

    // resetDropTitle отвечает за сброс выбранного ранее элемента в dropdown, который отображается его title. При любой смене счета устанавливается default значение для dropdown.
    if (cardType === "account") {
      setResetDropTitle(true);
    }

    // Если фильтруем карточку по критерии "Все"
    if (id.includes("all")) {
      // Выбраны все счета. Выводятся все транзакции всех счетов.
      if (cardType === "account") {
        setCardBodyItems({
          account: user.transactions,
          income: income.transacts,
          expense: expense.transacts
        });
        // Обозначаем что нет конкретного счета для фильтрации
        setSelectedAccount({ id: "all" });
        // Если выбрано "Все" для карточек расход/доход
      } else {
        // Фильтруем транзакции по типу карточки под выбранный счет
        if (selAccId.includes("account-id-")) {
          bodyItems = filter(dataByCardType.transacts, {
            account: selAccId
          });
          // В "Счетах" не выбрано конкретного счета. Выводим все транзакции в соответствии с типом карточки где было выбрано "Все"
        } else {
          bodyItems = dataByCardType.transacts;
        }
      }
      // Выбран конкретный счет для фильтрации
    } else if (id.includes("account")) {
      bodyItems = filter(user.transactions, {
        account: id
      });

      // Обновляем транзакции в карточках расход/доход под выбранный счет
      updIncomeExpenseTransacts(id, income, expense, setCardBodyItems);

      // Обозначаем что сейчас выбран счет и любые фильтрации должны опираться на него
      setSelectedAccount({ id });

      // Карточки Расход/Доход. Фильтруем транзакции по типу карточки.
    } else if (id.includes("transaction")) {
      bodyItems = filter(dataByCardType.transacts, { date });

      // Отключаем сброс title в dropdown для отображения выбранной даты для фильтрации
      setResetDropTitle(false);
    }

    if (bodyItems) {
      setCardBodyItems((prev) => ({
        ...prev,
        [cardType]: bodyItems
      }));
    }
  };

  if (keys(user || {}).length > 0) {
    const dropDownIncome = (
      <Dropdown
        items={income.uniqDates}
        type="income"
        onSelect={handleDropdownSelect}
        reset={resetDropTitle}
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
        items={expense.uniqDates}
        type="expense"
        onSelect={handleDropdownSelect}
        reset={resetDropTitle}
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
              bodyList={transformedBodyItems.income}
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
              route="/"
              bodyList={transformedBodyItems.account}
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
              route="/"
              bodyList={transformedBodyItems.expense}
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
    );
  } else {
    return <Loader className="flex justify-center items-center vh-30" />;
  }
};

MainPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MainPage;
