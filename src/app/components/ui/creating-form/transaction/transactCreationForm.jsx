import axios from "axios";
import PropTypes from "prop-types";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BiSolidCalculator } from "react-icons/bi";
import { keys } from "lodash";

import {
  DropdownComponent,
  DropdownSheet,
  DatePicker,
  TextField
} from "../../../common/form";
import {
  getNanoId,
  validationSchema,
  updateInputFields
} from "../../../../utils";
import { Calculator } from "../../index.js";
import { useFormValidation } from "../../../../hooks";

const { transactSchema } = validationSchema;

const TransactCreationForm = forwardRef(
  ({ user, updateUser, cardType }, ref) => {
    const { accounts, categories } = user;
    const [inputFields, setInputFields] = useState({
      account: { name: "" },
      date: new Date(),
      category: { name: "" },
      amount: "",
      comment: ""
    });
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const errors = useFormValidation(inputFields, transactSchema);
    console.log(errors);
    const hasErrors = keys(errors).length;

    const handleInputChange = ({ target }) => {
      updateInputFields(target, setInputFields);
    };

    const handleAddNewCategory = ({ target }) => {
      const { name, value } = target;

      const newCategory = {
        id: `category-id-${getNanoId(5)}`,
        type: "category",
        name: value
      };

      setInputFields((prev) => ({
        ...prev,
        [name]: newCategory
      }));
    };

    const handleUpdateUser = (newUserData) => {
      updateUser(newUserData);
    };

    const postDataToUser = () => {
      const { account, date, category, amount, comment } = inputFields;

      const idForNewTransact = `transaction-id-${getNanoId(5)}`;

      const newCategory = {
        id: category.id,
        type: "category",
        name: category.name,
        accounts: [account.id],
        transactions: [idForNewTransact]
      };

      console.log(newCategory);

      const newTransaction = {
        id: idForNewTransact,
        amount: -parseInt(amount, 10),
        type: cardType,
        account: account.id,
        category: category.id,
        date: date?.toISOString(),
        comment
      };
      console.log(newTransaction);

      try {
        axios.post(`/api/users/${user.id}/transactions`, newTransaction);
        axios.post(`/api/users/${user.id}/categories`, newCategory);

        handleUpdateUser({
          ...user
        });
      } catch (error) {
        console.error("Ошибка при создании", error);
      }
    };

    const handleSubmit = () => {
      setIsSubmitClicked(true);

      if (hasErrors) {
        return undefined;
      } else {
        postDataToUser();
      }
    };

    useImperativeHandle(ref, () => ({
      handleSubmit
    }));

    const getDatePickerClass = (errors) => {
      return errors?.date ? "is-invalid" : "is-valid";
    };

    return (
      <>
        <Row className="mb-4">
          <Col className="flex gap-3 items-end">
            <DropdownComponent
              name={"account"}
              items={accounts}
              defaultValue={"Счет"}
              value={inputFields.account.name}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.account}
            />

            <DropdownComponent
              name={"category"}
              items={categories}
              defaultValue={"Категория"}
              value={inputFields.category.name}
              placeholder={"Введите категорию"}
              inputClass={"max-w-[12rem] py-[4px]"}
              isAdditionEnabled={true}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              onElemAdding={handleAddNewCategory}
              error={errors.category}
            />
          </Col>
        </Row>

        <Row>
          <Col md={1}>
            <DropdownSheet
              iconClass={"p-1.5"}
              defaultValue={<BiSolidCalculator size={23} />}
            >
              <Calculator />
            </DropdownSheet>
          </Col>
          <Col md={6}>
            <TextField
              name={"amount"}
              placeholder={"Сумма"}
              value={inputFields.amount}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.amount}
            />
          </Col>
          <Col md={5}>
            <DatePicker
              name={"date"}
              value={inputFields.date}
              onChange={handleInputChange}
            >
              <Form.Control className={getDatePickerClass()} />
            </DatePicker>
          </Col>
        </Row>

        <TextField
          label={"Комментарий"}
          name={"comment"}
          value={inputFields.comment}
          floating={true}
          textaria={true}
          isSubmit={isSubmitClicked}
          onChange={handleInputChange}
        />
      </>
    );
  }
);

TransactCreationForm.displayName = TransactCreationForm;

TransactCreationForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accounts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    transactions: PropTypes.array.isRequired
  }).isRequired,
  updateUser: PropTypes.func,
  cardType: PropTypes.string
};

export default TransactCreationForm;
