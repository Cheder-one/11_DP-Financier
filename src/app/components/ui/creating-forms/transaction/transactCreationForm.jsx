import { forwardRef, useState } from "react";
import { BiSolidCalculator } from "react-icons/bi";
import { Row, Col } from "react-bootstrap";

import {
  DropdownComponent,
  DropdownSheet,
  DatePicker,
  TextField
} from "../../../common/form";
import Calculator from "../../calculator";

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
    const { name, value } = target;

    setInputFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <DropdownComponent
        name={"account"}
        defaultValue={"Счет"}
        value={inputFields.account.name}
        items={[]}
        // isSubmit={isSubmitClicked}
        onChange={handleInputChange}
        // error={errors.account}
      />

      {/* Creatable Multiselect Component  */}

      <TextField
        containerClass={"mt-3"}
        label={"Сумма"}
        name={"sum"}
        value={inputFields.sum}
        floating={true}
        // isSubmit={isSubmitClicked}
        // onChange={handleInputChange}
        // error={errors.sum}
      />

      <DropdownSheet
        squareSize={"17px"}
        dropListClass={"p-0 max-h-max"}
        defaultValue={<BiSolidCalculator size={21} />}
      >
        <Calculator />
      </DropdownSheet>

      <DatePicker />
    </>
  );
});

TransactCreationForm.displayName = TransactCreationForm;

export default TransactCreationForm;
