import PropTypes from "prop-types";
import { filter, isEmpty, keys } from "lodash";
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
  useFilterByUniqNType,
  useModal,
  useTransformedBodyItems
} from "../../hooks";

/* eslint-disable react-hooks/exhaustive-deps */

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selectedFilter, setSelectedFilter] = useState({
    account: { id: "" },
    income: { id: "" },
    expense: { id: "" }
  });
  console.log(selectedFilter);
  const [resetDropTitle, setResetDropTitle] = useState({
    account: false,
    transacts: false
  });
  const [cardBodyItems, setCardBodyItems] = useState({
    account: [],
    income: [],
    expense: []
  });
  const [cardToWhichAdded, setCardToWhichAdded] = useState("");
  const [showModal, setShowModal] = useModal(false);

  const getAccountTransacts = (id) => {
    return filter(user.transactions, { account: id });
  };
  const getTransactByAccount = (data, id) => {
    return filter(data.transacts, { account: id });
  };
  const getTransactsByDate = (data, date) => {
    return filter(data.transacts, { date });
  };
  const setAllItemsToDisplay = () => {
    if (isEmpty(user) !== true) {
      setCardBodyItems({
        account: user.transactions,
        income: income.transacts,
        expense: expense.transacts
      });
    }
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

  // [x] Установка обновленных значений
  useEffect(() => {
    setAllItemsToDisplay();
  }, [user.transactions]);

  const handleSelectedFilters = (filter) => {
    setSelectedFilter((prev) => ({
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

  const transformedBodyItems = useTransformedBodyItems(
    user,
    cardBodyItems,
    handleDelButtonClick
  );

  const filterTransactsByUniqNType = useFilterByUniqNType(
    user,
    selectedFilter.account.id
  );
  const { income, expense } = filterTransactsByUniqNType;

  const handleDropdownSelect = (eventKey) => {
    const { id: selAccId } = selectedFilter.account;
    const { id, type: cardType, date } = eventKey;

    let bodyItems = null;
    const dataByCardType = filterTransactsByUniqNType[cardType];

    if (cardType === "account") {
      setResetDropTitle((prev) => ({
        ...prev,
        transacts: true
      }));
    }

    if (id.includes("all")) {
      if (cardType === "account") {
        setAllItemsToDisplay();

        setSelectedFilter((prev) => ({
          ...prev,
          account: { ...prev.account, id: "all" }
        }));
      } else {
        if (selAccId.includes("account-id-")) {
          bodyItems = getTransactByAccount(
            dataByCardType,
            selAccId
          );
        } else {
          bodyItems = dataByCardType.transacts;
        }
      }
    } else if (id.includes("account")) {
      bodyItems = getAccountTransacts(id);

      setSelectedFilter((prev) => ({
        ...prev,
        account: { ...prev.account, id }
      }));

      updIncomeExpenseTransacts(
        id,
        income,
        expense,
        setCardBodyItems
      );
    } else if (id.includes("transaction")) {
      bodyItems = getTransactsByDate(dataByCardType, date);

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
