import { forwardRef, useState } from "react";
import { BiSolidCalculator } from "react-icons/bi";
import { Row, Col, Form } from "react-bootstrap";

import {
  DropdownComponent,
  DropdownSheet,
  DatePicker,
  TextField
} from "../../../common/form";
import Calculator from "../../calculator";
import { updateInputFields } from "../../../../utils";

const TransactCreationForm = forwardRef((props, ref) => {
  const [inputFields, setInputFields] = useState({
    account: {},
    date: new Date(),
    category: "",
    sum: "",
    comment: ""
  });

  // const errors = useFormValidation(inputFields, '');
  // const hasErrors = keys(errors).length;

  const handleInputChange = ({ target }) => {
    updateInputFields(target, setInputFields);
  };

  return (
    <>
      <DropdownComponent
        containerClass={"mb-3"}
        name={"account"}
        defaultValue={"Счет"}
        value={inputFields.account.name}
        items={[]}
        // isSubmit={isSubmitClicked}
        onChange={handleInputChange}
        // error={errors.account}
      />

      {/* Creatable Multiselect Component  */}

      <Row className="pt-3">
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
            // isSubmit={isSubmitClicked}
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
        onChange={handleInputChange}
      />
    </>
  );
});

TransactCreationForm.displayName = TransactCreationForm;

export default TransactCreationForm;
