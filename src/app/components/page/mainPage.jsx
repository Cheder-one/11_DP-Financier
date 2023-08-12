import PropTypes from "prop-types";
import { filter, includes, isEmpty, keys } from "lodash";
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
  useFilterByUniqNType,
  useTransformedBodyItems,
  useCardItems,
  useSelectedFilters
} from "../../hooks";

/* eslint-disable react-hooks/exhaustive-deps */

// Move to Utils
const getAccountTransacts = (user, id) => {
  return filter(user.transactions, { account: id });
};
// Move to Utils
const getTransactByAccount = (data, id) => {
  return filter(data.transacts, { account: id });
};
// Move to Utils
const getTransactsByDate = (data, date) => {
  return filter(data.transacts, { date });
};

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [cardItems, setCardItems] = useCardItems();
  const [selectedFilters, setSelectedFilters] = useSelectedFilters();
  const [cardToWhichAdded, setCardToWhichAdded] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resetDropTitle, setResetDropTitle] = useState({
    transacts: false
  });

  const { id: selectedAccId } = selectedFilters.account;
  console.log(selectedFilters);

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
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const updAccountFilters = (id) => {
    setSelectedFilters((prev) => ({
      ...prev,
      account: { ...prev.account, id }
    }));
  };

  const transactsByType = useFilterByUniqNType(user, selectedAccId);
  const { income, expense } = transactsByType;

  // Move to Utils
  const checkIsIncomeExpense = (type) => {
    return includes(["income", "expense"], type);
  };

  // Move to Utils
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
      const cardFilter = filters[key];

      handleDropdownSelect(cardFilter);
    }
  };

  useEffect(() => {
    setItemsByFilter(selectedFilters);
  }, [user.transactions]);

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

    let cardItems = null;
    const dataCardType = transactsByType[cardType];
    const isFilteringAccCard = cardType === "account";
    const isIncomeExpenseCard = checkIsIncomeExpense(cardType);

    if (isFilterBy.all(id)) {
      if (isFilteringAccCard) {
        setAllItemsToDisplay(user, transactsByType);
        // updAccountFilters("all");
      } else if (isIncomeExpenseCard) {
        cardItems = filterTransactsBySelAcc(
          selectedAccId,
          dataCardType
        );
      }
    }

    if (isFilterBy.account(id)) {
      // updAccountFilters(id);
      updIncExpTransacts(id, transactsByType, setCardItems);
      cardItems = getAccountTransacts(user, id);
    }

    if (isFilterBy.date(id)) {
      setResetDropTitle({ transacts: false });
      cardItems = getTransactsByDate(dataCardType, date);
    }

    updateCardItems(cardType, cardItems);

    if (isFilteringAccCard) {
      setResetDropTitle({ transacts: true });
    }
  };

  const handleSelectedFilters = (filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter.type]: filter
    }));
  };

  const handleAddButtonClick = (type) => {
    setCardToWhichAdded(type);
    setShowModal(true);
  };

  const handleDelButtonClick = (event) => {
    const transactId = event.currentTarget.id;
    deleteUserTransact(user.id, transactId);
    handlePostSuccess();
  };

  const handlePostSuccess = () => {
    fetchUserData();
  };

  const transformedCardItems = useTransformedBodyItems(
    user,
    cardItems,
    handleDelButtonClick
  );

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
