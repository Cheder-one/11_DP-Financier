import PropTypes from "prop-types";
import { filter, keys } from "lodash";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import {
  Spinner,
  TableCardsShell,
  AccountCreationModal,
  TransactCreationModal
} from "../ui";
import {
  getUserData,
  updIncomeExpenseTransacts,
  deleteUserTransact
} from "../../utils";
import {
  useFilterByUniqAndType,
  useModal,
  useTransformedBodyItems
} from "../../hooks";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selectedAccount, setSelectedAccount] = useState({ id: "" });
  const [resetDropTitle, setResetDropTitle] = useState({
    account: false,
    transacts: false
  });
  const [cardBodyItems, setCardBodyItems] = useState({
    account: [],
    income: [],
    expense: []
  });
  const [showModal, setShowModal] = useModal(false);
  const [cardToWhichAdded, setCardToWhichAdded] = useState("");

  const fetchUserData = async () => {
    try {
      const user = await getUserData(userId);
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  // Получаем данные пользователя при монтировании компонента
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (keys(user).length > 0) {
      setCardBodyItems({
        account: user?.transactions,
        income: filter(user?.transactions, { type: "income" }),
        expense: filter(user?.transactions, { type: "expense" })
      });
    }
    // eslint-disable-next-line
  }, [user.transactions]);

  // Функция для обработки успешного POST запроса
  const handlePostSuccess = () => {
    fetchUserData(); // Получаем обновленные данные пользователя

    // setResetDropTitle((prev) => ({
    //   ...prev,
    //   account: true
    // }));
  };

  // Возвращаем в init значение reset для title Счетов
  // useEffect(() => {
  //   setResetDropTitle((prev) => ({
  //     ...prev,
  //     account: false
  //   }));
  // }, [resetDropTitle.account]);

  const handleDelButtonClick = (event) => {
    const transactId = event.currentTarget.id;
    console.log("Transact ID:", transactId);

    deleteUserTransact(user.id, transactId);
    handlePostSuccess();
  };

  // Универсализирует данные для отправки в TableCard, чтобы компонент не был привязан к конкретным переменным.
  const transformedBodyItems = useTransformedBodyItems(
    user,
    cardBodyItems,
    handleDelButtonClick
  );

  // Фильтрует транзакции по типу (расход/доход). Создает под каждый тип массив уникальных дат для возможности отображения транзакций по датам.
  const filterByUniqAndType = useFilterByUniqAndType(
    user,
    selectedAccount
  );
  const { income, expense } = filterByUniqAndType;

  // TODO Исправить переключение на отображение Всех элементов при добавлении/удалении

  // Обработчик dropdown.
  const handleDropdownSelect = (eventKey) => {
    const { id, type: cardType, date } = eventKey;
    const { id: selAccId } = selectedAccount;
    const dataByCardType = filterByUniqAndType[cardType];

    let bodyItems = null;

    // resetDropTitle отвечает за сброс выбранного ранее элемента в dropdown, который отображается в его title.
    // При любой смене счета устанавливается default значение для dropdown.
    if (cardType === "account") {
      setResetDropTitle((prev) => ({
        ...prev,
        transacts: true
      }));
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

      // prettier-ignore
      // Обновляем транзакции в cards расход/доход под выбранный счет
      updIncomeExpenseTransacts(id, income, expense, setCardBodyItems);

      // Обозначаем что сейчас выбран счет и любые фильтрации должны опираться на него
      setSelectedAccount({ id });

      // Карточки Расход/Доход. Фильтруем транзакции по типу карточки.
    } else if (id.includes("transaction")) {
      bodyItems = filter(dataByCardType.transacts, {
        date
      });

      // Отключаем сброс title в dropdown для отображения выбранной даты для фильтрации
      setResetDropTitle((prev) => ({
        ...prev,
        transacts: false
      }));
    }

    if (bodyItems) {
      setCardBodyItems((prev) => ({
        ...prev,
        [cardType]: bodyItems
      }));
    }
  };

  const handleAddButtonClick = (type) => {
    setCardToWhichAdded(type);
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
      {cardToWhichAdded === "account" ? (
        <AccountCreationModal
          onSuccess={handlePostSuccess}
          {...{ user, showModal, setShowModal }}
        />
      ) : (
        <TransactCreationModal
          cardType={cardToWhichAdded}
          onSuccess={handlePostSuccess}
          {...{ user, showModal, setShowModal }}
        />
      )}
    </div>
  ) : (
    <Spinner className="flex justify-center items-center h-30vh" />
  );
};

MainPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MainPage;
