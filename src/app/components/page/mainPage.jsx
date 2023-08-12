import PropTypes from "prop-types";
import { filter, includes, isEmpty, isEqual, keys } from "lodash";
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
  updIncExpTransacts,
  deleteUserTransact
} from "../../utils";
import {
  useModal,
  useFilterByUniqNType,
  useTransformedBodyItems
} from "../../hooks";

/* eslint-disable react-hooks/exhaustive-deps */

const getAccountTransacts = (user, id) => {
  return filter(user.transactions, { account: id });
};
const getTransactByAccount = (data, id) => {
  return filter(data.transacts, { account: id });
};
const getTransactsByDate = (data, date) => {
  return filter(data.transacts, { date });
};

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  // TODO Вынести в Хук
  const [cardItems, setCardItems] = useState({
    account: [],
    income: [],
    expense: []
  });
  // TODO Вынести в Хук
  const [selectedFilters, setSelectedFilters] = useState({
    account: { id: "" },
    income: { id: "" },
    expense: { id: "" }
  });
  console.log(selectedFilters);
  const [resetDropTitle, setResetDropTitle] = useState({
    transacts: false
  });
  const [cardToWhichAdded, setCardToWhichAdded] = useState("");
  const [showModal, setShowModal] = useModal(false);

  const { id: selectedAccId } = selectedFilters.account;

  const setAllItemsToDisplay = (user, { income, expense }) => {
    if (isEmpty(user)) return;

    setCardItems({
      account: user.transactions,
      income: income.transacts,
      expense: expense.transacts
    });
  };

  const fetchUserData = async () => {
    try {
      const user = await getUserData(userId);
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  // Получение данных
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const transactsByType = useFilterByUniqNType(
    user,
    selectedFilters.account.id
  );
  const { income, expense } = transactsByType;

  const updAccountFilters = (id) => {
    setSelectedFilters((prev) => ({
      ...prev,
      account: { ...prev.account, id }
    }));
  };

  const checkIsIncomeExpense = (type) => {
    return includes(["income", "expense"], type);
  };

  const filterTransactsBySelAcc = (accId, dataCardType) => {
    const isAccSelected = accId.startsWith("account-id");

    if (!isAccSelected) {
      return dataCardType.transacts;
    } else {
      return getTransactByAccount(dataCardType, accId);
    }
  };

  // Move to Utils
  const isFilterBy = {
    all: (id) => id.startsWith("all"),
    account: (id) => id.startsWith("account"),
    date: (id) => id.startsWith("transaction")
  };

  const setItemsByFilter = (filters) => {
    for (const key in filters) {
      const { id, type: cardType, date } = filters[key];

      let bodyItems = null;
      const dataCardType = transactsByType[cardType];
      const isFilteringAccCard = cardType === "account";
      const isIncomeExpenseCard = checkIsIncomeExpense(cardType);

      if (isFilterBy.all(id)) {
        if (isFilteringAccCard) {
          setAllItemsToDisplay(user, transactsByType);
        } else if (isIncomeExpenseCard) {
          bodyItems = filterTransactsBySelAcc(
            selectedAccId,
            dataCardType
          );
        }
      }

      if (isFilterBy.account(id)) {
        updIncExpTransacts(id, transactsByType, setCardItems);
        bodyItems = getAccountTransacts(user, id);
      }

      if (isFilterBy.date(id)) {
        bodyItems = getTransactsByDate(dataCardType, date);
      }

      updateCardItems(cardType, bodyItems);
    }
  };

  // NOTE Item's должны устанавливаться в body согласно выбранным фильтрам

  useEffect(() => {
    setItemsByFilter(selectedFilters);
  }, [user.transactions]);

  const handleSelectedFilters = (filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter.type]: filter
    }));
  };

  const handlePostSuccess = () => {
    fetchUserData();
  };

  const handleDelButtonClick = (event) => {
    const transactId = event.currentTarget.id;

    deleteUserTransact(user.id, transactId);
    handlePostSuccess();
  };

  const transformedCardItems = useTransformedBodyItems(
    user,
    cardItems,
    handleDelButtonClick
  );

  const updateCardItems = (type, items) => {
    if (items) {
      setCardItems((prev) => ({
        ...prev,
        [type]: items
      }));
    }
  };

  const handleDropdownSelect = (eventKey) => {
    const { id, type: cardType, date } = eventKey;

    let bodyItems = null;
    const dataCardType = transactsByType[cardType];
    const isFilteringAccCard = cardType === "account";
    const isIncomeExpenseCard = checkIsIncomeExpense(cardType);

    if (isFilterBy.all(id)) {
      if (isFilteringAccCard) {
        setAllItemsToDisplay(user, transactsByType);
        updAccountFilters({ id: "all" });
      } else if (isIncomeExpenseCard) {
        bodyItems = filterTransactsBySelAcc(
          selectedAccId,
          dataCardType
        );
      }
    }

    if (isFilterBy.account(id)) {
      updAccountFilters(id);
      updIncExpTransacts(id, transactsByType, setCardItems);
      bodyItems = getAccountTransacts(user, id);
    }

    if (isFilterBy.date(id)) {
      setResetDropTitle({ transacts: false });
      bodyItems = getTransactsByDate(dataCardType, date);
    }

    updateCardItems(cardType, bodyItems);

    if (isFilteringAccCard) {
      setResetDropTitle({ transacts: true });
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
        bodyItems={transformedCardItems}
        reset={resetDropTitle}
        onSelect={handleDropdownSelect}
        onPostSuccess={handleSelectedFilters}
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
