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
  updateInputFields,
  postUserCategory,
  postUserTransact,
  createNewCategory,
  createNewTransact
} from "../../../../utils";
import { Calculator } from "../../index.js";
import { useFormValidation } from "../../../../hooks";
const { transactSchema } = validationSchema;

const TransactCreationForm = forwardRef(
  ({ user, onSuccess, cardType }, ref) => {
    const { accounts, categories } = user;
    const [inputFields, setInputFields] = useState({
      account: { name: "" },
      date: new Date(),
      category: { name: "" },
      amount: "",
      comment: ""
    });
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const handleInputChange = ({ target }) => {
      updateInputFields(target, setInputFields);
    };

    const handleAddNewCategory = ({ target }) => {
      const { name, value } = target;
      if (!value) return;

      const newCategory = {
        id: "isNew",
        type: "category",
        name: value
      };

      setInputFields((prev) => ({
        ...prev,
        [name]: newCategory
      }));
    };

    const errors = useFormValidation(inputFields, transactSchema);
    const hasErrors = keys(errors).length;

    // TODO Починить обновление state user после post

    // TODO Разделить логику postDataToUser на две функции
    const postDataToUser = () => {
      const { category } = inputFields;
      const newTransactId = `transaction-id-${getNanoId()}`;
      const newCategoryId = `category-id-${getNanoId()}`;

      const dataToCreate = {
        ...inputFields,
        newTransactId,
        cardType
      };

      const newCategory = createNewCategory(dataToCreate);
      const newTransaction = createNewTransact(dataToCreate);

      if (category.id === "isNew") {
        newCategory.id = newCategoryId;
        newTransaction.category = newCategoryId;
        postUserCategory(user.id, newCategory);
      }
      postUserTransact(user.id, newTransaction);

      onSuccess();
    };

    const handleSubmit = () => {
      setIsSubmitClicked(true);

      if (hasErrors) {
        return false;
      } else {
        postDataToUser();
        return true;
      }
    };

    useImperativeHandle(ref, () => ({
      handleSubmit
    }));

    return (
      <>
        <Row className="mb-4 mt-3">
          <Col className="flex gap-3">
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
              <Calculator name={"amount"} onEval={handleInputChange} />
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
              <Form.Control
                className={errors?.date ? "is-invalid" : "is-valid"}
              />
            </DatePicker>
            {errors.date && (
              <div className="text-sm text-[#DC3545] pt-1 mb-3">
                {errors.date}
              </div>
            )}
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
