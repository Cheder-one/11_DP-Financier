import PropTypes from "prop-types";
import { isEmpty, keys } from "lodash";
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
  deleteUserTransact,
  isFilterBy,
  checkIsIncomeExpense,
  getTransactByAccount,
  getAccountTransacts,
  getTransactsByDate
} from "../../utils";
import {
  useFilterByUniqNType,
  useTransformedBodyItems,
  useCardItems,
  useSelectedFilters,
  useActualQuotes
} from "../../hooks";
import FinanceSummary from "../../layout/financeSummary";
import MarqueeComponent from "../common/marquee/MarqueeComponent";

/* eslint-disable react-hooks/exhaustive-deps */

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const actualQuotes = useActualQuotes();
  const [cardItems, setCardItems] = useCardItems();
  const [selectedFilters, setSelectedFilters] = useSelectedFilters();
  const [cardToWhichAdded, setCardToWhichAdded] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resetDropTitle, setResetDropTitle] = useState({
    transacts: false
  });

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
    const user = await getUserData(userId);
    setUser(user);
  };
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const transactsByType = useFilterByUniqNType(user, selectedAccId);
  const { income, expense } = transactsByType;

  const filterTransactsBySelAcc = (accId, dataCardType) => {
    const isAccSelected = accId.startsWith("account-id");
    if (!isAccSelected) {
      return dataCardType.transacts;
    } else {
      return getTransactByAccount(dataCardType, accId);
    }
  };

  const setItemsByFilter = (filters) => {
    for (const key in filters) {
      const filtersCard = filters[key];
      handleDropdownSelect(filtersCard);
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
      } else if (isIncomeExpenseCard) {
        cardItems = filterTransactsBySelAcc(
          selectedAccId,
          dataCardType
        );
      }
    }
    if (isFilterBy.account(id)) {
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
          <FinanceSummary {...{ user, actualQuotes }} />
        </Col>
      </Row>

      <MarqueeComponent {...{ user, actualQuotes }} />

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
