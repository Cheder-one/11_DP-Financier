import PropTypes from "prop-types";
import { forwardRef, useState, useImperativeHandle } from "react";
import { BiSolidCalculator } from "react-icons/bi";
import { Row, Col, Form } from "react-bootstrap";
import { keys } from "lodash";

import {
  DropdownComponent,
  DropdownSheet,
  DatePicker,
  TextField
} from "../../../common/form";
import Calculator from "../../calculator";
import { updateInputFields } from "../../../../utils";
import { useFormValidation } from "../../../../hooks";

const TransactCreationForm = forwardRef(({ user }, ref) => {
  const [inputFields, setInputFields] = useState({
    account: {},
    date: new Date(),
    categories: [],
    sum: "",
    comment: ""
  });
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const { accounts, categories } = user;

  // const errors = useFormValidation(inputFields, "");
  // const hasErrors = keys(errors).length;

  const handleInputChange = ({ target }) => {
    updateInputFields(target, setInputFields);
  };

  const handleSubmit = () => {
    setIsSubmitClicked(true);

    if ("hasErrors") {
      return undefined;
    } else {
      return inputFields;
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  return (
    <>
      <DropdownComponent
        name={"account"}
        items={accounts}
        defaultValue={"Счет"}
        value={inputFields.account.name}
        isSubmit={isSubmitClicked}
        onChange={handleInputChange}
        // error={errors.account}
      />

      <Row className="pt-3 ">
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
    accounts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  }).isRequired
};

export default TransactCreationForm;
