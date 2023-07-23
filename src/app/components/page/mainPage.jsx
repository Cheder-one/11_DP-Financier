import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { filter, find, keys } from "lodash";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";

import {
  getUniqDates,
  getUserData,
  updIncomeExpenseTransacts
} from "../../utils";
import Loader from "../ui/spinner";
import TableCardsShell from "../ui/table-cards/tableCardsShell";
import useModal from "../../hooks/useModal";
import {
  AccountCreationModal,
  TransactCreationModal
} from "../ui/creating-forms";
import Calculator from "../ui/calculator";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selectedAccount, setSelectedAccount] = useState({ id: "" });
  const [resetDropTitle, setResetDropTitle] = useState(false);
  const [cardBodyItems, setCardBodyItems] = useState({
    account: [],
    income: [],
    expense: []
  });
  const [showModal, setShowModal] = useModal(false);
  const [cardTypeToAdd, setCardTypeToAdd] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData(userId);
        setUser(user);

        setCardBodyItems({
          account: user.transactions,
          income: filter(user.transactions, { type: "income" }),
          expense: filter(user.transactions, { type: "expense" })
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
      // Создает массив уникальных дат транзакций для dropdownList
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

    // resetDropTitle отвечает за сброс выбранного ранее элемента в dropdown, который отображается в его title. При любой смене счета устанавливается default значение для dropdown.
    if (cardType === "account") {
      setResetDropTitle(true);
    }

    // Если фильтруем карточку по критерию "Все"
    if (id.includes("all")) {
      // Выбраны "Все" счета. Выводятся все транзакции всех счетов.
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

  const handleAddButtonClick = (type) => {
    setCardTypeToAdd(type);
    setShowModal(true);
  };

  return keys(user || {}).length > 0 ? (
    <div className="mx-4">
      <Calculator />
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
      {cardTypeToAdd === "account" ? (
        <AccountCreationModal {...{ showModal, setShowModal }} />
      ) : (
        <TransactCreationModal {...{ showModal, setShowModal }} />
      )}
    </div>
  ) : (
    <Loader className="flex justify-center items-center h-30vh" />
  );
};

MainPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MainPage;
