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
import { inputChange } from "../../../../utils";

const TransactCreationForm = forwardRef((props, ref) => {
  const [inputFields, setInputFields] = useState({
    account: {},
    date: {},
    category: "",
    sum: "",
    comment: ""
  });

  // const errors = useFormValidation(inputFields, '');
  // const hasErrors = keys(errors).length;

  const handleInputChange = ({ target }) => {
    inputChange(target, setInputFields);
  };

  return (
    <>
      <DropdownComponent
        name={"account"}
        defaultValue={"Счет"}
        containerClass={"w-100"}
        value={inputFields.account.name}
        items={[]}
        // isSubmit={isSubmitClicked}
        onChange={handleInputChange}
        // error={errors.account}
      />

      {/* Creatable Multiselect Component  */}

      <Row className="flex items-center mt-3">
        <Col md={1}>
          <DropdownSheet
            iconClass={"p-1.5"}
            childrenClass={"p-0 max-h-max"}
            defaultValue={<BiSolidCalculator size={23} />}
          >
            <Calculator />
          </DropdownSheet>
        </Col>
        <Col md={5}>
          <TextField
            containerClass={"max-w-sm"}
            name={"sum"}
            placeholder={"Сумма"}
            value={inputFields.sum}
            // error={errors.sum}
            // isSubmit={isSubmitClicked}
            onChange={handleInputChange}
          />
        </Col>
        <Col md={5}>
          <DatePicker childrenClass={"max-w-sm"}>
            <Form.Control />
          </DatePicker>
        </Col>
      </Row>
    </>
  );
});

TransactCreationForm.displayName = TransactCreationForm;

export default TransactCreationForm;
