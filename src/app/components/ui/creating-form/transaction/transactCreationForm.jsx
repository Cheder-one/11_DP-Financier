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
import { getNanoId, updateInputFields } from "../../../../utils";
import { InputWithButton, Calculator } from "../../index.js";
import { useFormValidation } from "../../../../hooks";

const TransactCreationForm = forwardRef(({ user }, ref) => {
  const { accounts, categories } = user;
  const [inputFields, setInputFields] = useState({
    account: { name: "" },
    date: new Date(),
    category: { name: "" },
    sum: "",
    comment: ""
  });
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  console.log(inputFields);

  // const errors = useFormValidation(inputFields, "");
  // const hasErrors = keys(errors).length;

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

  const postDataToUser = (name, value) => {
    const newCategory = {
      id: "category-id-" + getNanoId(5),
      type: "category",
      name: value,
      accounts: ["account-id-2"],
      transactions: ["transaction-id-2"]
    };

    try {
      axios.post(`/api/users/${user.id}/categories`, newCategory);
      console.log(newCategory);
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
    }
  };

  const handleSubmit = () => {
    setIsSubmitClicked(true);

    if ("hasErrors") {
      return undefined;
    } else {
      const newCategory = {
        id: `category-id-${getNanoId(5)}`,
        type: "category",
        name: inputFields.category.name,
        accounts: [inputFields.account.id],
        transactions: ""
        // [`transaction-id-${getNanoId(5)}`]
      };

      console.log({ newCategory });

      return inputFields;
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

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
            // error={errors.account}
          />

          <DropdownComponent
            name={"category"}
            items={categories}
            placeholder={"Введите категорию"}
            defaultValue={"Категория"}
            value={inputFields.category.name}
            isAdditionEnabled={true}
            isSubmit={isSubmitClicked}
            onChange={handleInputChange}
            onElemAdding={handleAddNewCategory}
            // error={errors.account}
          />
        </Col>
      </Row>

      <Row className="">
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
            name={"sum"}
            placeholder={"Сумма"}
            value={inputFields.sum}
            // error={errors.sum}
            isSubmit={isSubmitClicked}
            onChange={handleInputChange}
          />
        </Col>
        <Col md={5}>
          <DatePicker
            name={"date"}
            value={inputFields.date}
            onChange={handleInputChange}
          >
            <Form.Control />
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
});

TransactCreationForm.displayName = TransactCreationForm;

TransactCreationForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accounts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  }).isRequired
};

export default TransactCreationForm;
