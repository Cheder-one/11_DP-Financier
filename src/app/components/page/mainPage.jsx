import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { filter, keys, uniqBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { BiSolidPlusSquare as PlusSquare } from "react-icons/bi";
import { LiaWindowCloseSolid as CloseX } from "react-icons/lia";
import { toReadableDate } from "../../utils/functions/toReadableDate";
import Loader from "../ui/spinner";
import ListCard from "../common/card/ListCard";
import Dropdown from "../common/form/dropdown";

const MainPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((resp) => setUser(resp.data.user))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleDropdownSelect = (eventKey, type) => {
    if (type === "account") {
      setSelectedAccount(eventKey);
      setSelectedDate(null);
    } else if (type === "date") {
      setSelectedDate(eventKey);
    }
  };

  const filteredTransactions = useMemo(() => {
    if (!selectedAccount || selectedAccount === "Все") {
      return user.transactions;
    }

    if (!selectedDate || selectedDate === "Все") {
      return user.transactions.filter(
        (transaction) => transaction.account === selectedAccount
      );
    }

    return user.transactions.filter(
      (transaction) =>
        transaction.account === selectedAccount &&
        transaction.date === selectedDate
    );
  }, [selectedAccount, selectedDate, user.transactions]);

  // const accountDropdownItems = useMemo(() => {
  //   const dropdownItems = user.accounts.map((account) => ({
  //     id: account.id,
  //     name: account.name
  //   }));
  //   dropdownItems.unshift({ id: "Все", name: "Все" });
  //   return dropdownItems;
  // }, [user.accounts]);

  const dateDropdownItems = useMemo(() => {
    const dropdownItems = [];
    if (selectedAccount && selectedAccount !== "Все") {
      const account = user.accounts.find(
        (account) => account.id === selectedAccount
      );
      const accountTransactions = user.transactions.filter(
        (transaction) => transaction.account === account.id
      );
      const uniqueDates = [
        ...new Set(accountTransactions.map((transaction) => transaction.date))
      ];
      dropdownItems.push({ id: "Все", name: "Все" });
      uniqueDates.forEach((date) => {
        dropdownItems.push({ id: date, name: date });
      });
    }
    return dropdownItems;
  }, [selectedAccount, user.accounts, user.transactions]);

  const addButton = <Button>"кнопка"</Button>;

  const delButton = <Button>"кнопка"</Button>;

  return (
    <>
      {Object.keys(user || {}).length > 0 ? (
        <div className="mx-4">
          <Row style={{ marginTop: "3%" }}>
            <Col md="4">
              <ListCard
                md={[4, 8, 4]}
                title={{
                  first: "Доход",
                  second: (
                    <Dropdown
                      items={dateDropdownItems}
                      type="date"
                      onSelect={(eventKey) =>
                        handleDropdownSelect(eventKey, "date")
                      }
                    />
                  ),
                  third: addButton
                }}
                type="income"
                route="/"
                bodyList={filteredTransactions.filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    (!selectedAccount ||
                      selectedAccount === "Все" ||
                      transaction.account === selectedAccount) &&
                    (!selectedDate ||
                      selectedDate === "Все" ||
                      transaction.date === selectedDate)
                )}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>

            <Col md="4">
              <ListCard
                md={[4, 8, 4]}
                title={{
                  first: "Счет",
                  second: (
                    <Dropdown
                      items={dateDropdownItems}
                      type="date"
                      onSelect={(eventKey) =>
                        handleDropdownSelect(eventKey, "date")
                      }
                    />
                  ),
                  third: addButton
                }}
                type="account"
                route="/"
                bodyList={filteredTransactions.filter(
                  (transaction) =>
                    transaction.type === "account" &&
                    (!selectedAccount ||
                      selectedAccount === "Все" ||
                      transaction.account === selectedAccount) &&
                    (!selectedDate ||
                      selectedDate === "Все" ||
                      transaction.date === selectedDate)
                )}
                bodyCol={{
                  third: delButton
                }}
              />
            </Col>
            <Col md="4">
              <ListCard
                md={[4, 8, 4]}
                title={{
                  first: "Расход",
                  second: (
                    <Dropdown
                      items={dateDropdownItems}
                      type="date"
                      onSelect={(eventKey) =>
                        handleDropdownSelect(eventKey, "date")
                      }
                    />
                  ),
                  third: addButton
                }}
                type="expense"
                route="/"
                bodyList={filteredTransactions.filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    (!selectedAccount ||
                      selectedAccount === "Все" ||
                      transaction.account === selectedAccount) &&
                    (!selectedDate ||
                      selectedDate === "Все" ||
                      transaction.date === selectedDate)
                )}
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
