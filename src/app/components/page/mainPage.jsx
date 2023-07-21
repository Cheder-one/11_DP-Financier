import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { chain, filter, find, keys } from "lodash";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";

import Loader from "../ui/spinner";
import { toReadableDate } from "../../utils";
import TableCardsShell from "../ui/table-cards/tableCardsShell";
import { AccountCreationModal } from "../ui/creating-forms";

// Создает массив уникальных дат транзакций для dropdownList
const getUniqDates = (data) => {
  return chain(data)
    .uniqBy("date")
    .map((uniq) => ({
      ...uniq,
      name: toReadableDate(uniq.date).dateOnly
    }))
    .reverse()
    .value();
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
  const [showModal, setShowModal] = useState(false);

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

  // Универсализирует данные для отправки в TableCard, чтобы компонент не был привязан к конкретным переменным.
  const transformedBodyItems = useMemo(() => {
    const updatedCards = {};

    keys(cardBodyItems).forEach((key) => {
      const card = cardBodyItems[key];
      const updatedCard = card.map((item) => ({
        ...item,
        firstCol: item.amount,
        secondCol: find(user.categories, { id: item.category }).name,
        thirdCol: (
          <Button variant="" size="sm" className="p-0">
            <CloseX style={{ color: "red" }} size={19} />
          </Button>
        )
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

  // Обработчик dropdown.
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

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  return keys(user || {}).length > 0 ? (
    <div className="mx-4">
      <TableCardsShell
        dropList={{
          account: user.accounts,
          income,
          expense
        }}
        bodyItems={transformedBodyItems}
        reset={resetDropTitle}
        onSelect={handleDropdownSelect}
        onAddButtonClick={handleAddButtonClick}
      />

      <Row className="mt-3%">
        <Col>
          <div className="flex justify-center items-center border border-dark h-40vh">
            <h5>Element</h5>
          </div>
        </Col>
      </Row>

      <AccountCreationModal {...{ showModal, setShowModal }} />
    </div>
  ) : (
    <Loader className="flex justify-center items-center h-30vh" />
  );
};

MainPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MainPage;
